import Papa from 'papaparse';

const SHEET_URL = import.meta.env.VITE_GOOGLE_SHEET_CSV_URL;
let cachedData = null;

const fetchAndParseCSV = () => {
  return new Promise((resolve, reject) => {
    if (!SHEET_URL) {
      return reject(new Error('VITE_GOOGLE_SHEET_CSV_URL is not set'));
    }
    Papa.parse(SHEET_URL, {
      download: true,
      header: true,
      complete: (results) => {
        cachedData = results.data;
        resolve(cachedData);
      },
      error: (error) => {
        reject(error);
      }
    });
  });
};

const processStats = (data) => {
  // Фільтруємо порожні рядки
  const rows = data.filter(r => r.amount && r.time);
  
  if (rows.length === 0) {
    return {
      title: 'Збір (Google Таблиця)',
      balance: 0,
      totalIncome: 0,
      donationsCount: 0,
      averageDonation: 0,
      dailyStats: [],
      contributors: [],
      error: 'Немає даних у таблиці'
    };
  }

  // Сортуємо від найновіших до найстаріших
  rows.sort((a, b) => Number(b.time) - Number(a.time));

  let totalIncome = 0;
  let donationsCount = 0;
  
  const dailyMap = {};
  const contributorsMap = {};

  rows.forEach(row => {
    const amount = Number(row.amount);
    if (amount <= 0) return; // Рахуємо тільки поповнення
    
    totalIncome += amount;
    donationsCount++;

    // Статистика по днях
    const dateObj = new Date(Number(row.time) * 1000);
    const dateStr = dateObj.toISOString().split('T')[0];
    if (!dailyMap[dateStr]) dailyMap[dateStr] = 0;
    dailyMap[dateStr] += amount;

    // Топ донаторів
    const name = row.description || 'Анонім';
    if (!contributorsMap[name]) contributorsMap[name] = 0;
    contributorsMap[name] += amount;
  });

  const dailyStats = Object.keys(dailyMap)
    .sort((a, b) => new Date(a).getTime() - new Date(b).getTime()) // для графіка від старих до нових
    .map(date => ({
      date,
      amount: dailyMap[date]
    }));

  const contributors = Object.keys(contributorsMap)
    .map(name => ({
      name,
      amount: contributorsMap[name]
    }))
    .sort((a, b) => b.amount - a.amount);

  // Поточний баланс беремо з найновішої транзакції
  const currentBalance = rows.length > 0 ? Number(rows[0].balance) : 0;

  return {
    title: 'Збір (Google Таблиця)',
    balance: currentBalance,
    totalIncome,
    donationsCount,
    averageDonation: donationsCount > 0 ? Math.floor(totalIncome / donationsCount) : 0,
    dailyStats,
    contributors
  };
};

export const getStats = async () => {
  try {
    const data = await fetchAndParseCSV();
    return processStats(data);
  } catch (error) {
    console.error('Failed to get stats', error);
    return { error: 'Не вдалося завантажити дані з Google Таблиці. Перевірте VITE_GOOGLE_SHEET_CSV_URL' };
  }
};

export const getTransactions = async () => {
  if (!cachedData) {
    try {
      await fetchAndParseCSV();
    } catch (error) {
      return [];
    }
  }
  
  const rows = cachedData.filter(r => r.amount && r.time);
  rows.sort((a, b) => Number(b.time) - Number(a.time));
  
  return rows.slice(0, 50).map(row => ({
    time: new Date(Number(row.time) * 1000).toISOString(),
    amount: Number(row.amount),
    description: row.description,
    comment: row.comment
  }));
};

export const triggerHistoricalSync = async () => {
  // Для serverless архітектури нам не потрібна історична синхронізація, 
  // адже CSV одразу містить усю історію з таблиці.
  return { status: 'Accepted' };
};
