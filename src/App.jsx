import { useState, useEffect } from 'react';
import { getStats, getTransactions, triggerHistoricalSync } from './api';
import { Wallet, TrendingUp, Users, Activity } from 'lucide-react';
import { formatCurrency } from './utils/format';

import { Header } from './components/Header';
import { StatCard } from './components/StatCard';
import { DonationsChart } from './components/DonationsChart';
import { RecentTransactions } from './components/RecentTransactions';
import { TopContributorsPie } from './components/TopContributorsPie';
import { TopContributorsList } from './components/TopContributorsList';

function App() {
  const [stats, setStats] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastFetchTime, setLastFetchTime] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [statsData, txData] = await Promise.all([
        getStats(),
        getTransactions(),
      ]);
      setStats(statsData);
      setTransactions(txData);
      setLastFetchTime(new Date());
    } catch (error) {
      console.error("Failed to fetch data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem('isHistorySynced')) {
      triggerHistoricalSync().catch(console.error);
      localStorage.setItem('isHistorySynced', 'true');
    }

    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading && !stats) {
    return (
      <div className="container flex-between" style={{ justifyContent: 'center', height: '100vh' }}>
        <div className="text-gradient" style={{ fontSize: '1.5rem' }}>Завантаження...</div>
      </div>
    );
  }

  return (
    <div className="container">
      <Header 
        title={stats?.title} 
        lastFetchTime={lastFetchTime} 
        loading={loading} 
        onRefresh={fetchData} 
      />

      {stats && !stats.error && (
        <>
          <div className="grid grid-cols-4" style={{ marginBottom: '40px' }}>
            <StatCard 
              title="Поточний баланс" 
              value={formatCurrency(stats.balance)} 
              icon={Wallet} 
              delay="0.1s" 
            />
            <StatCard 
              title="Всього зібрано" 
              value={formatCurrency(stats.totalIncome)} 
              icon={TrendingUp} 
              delay="0.2s" 
            />
            <StatCard 
              title="Кількість донатів" 
              value={stats.donationsCount} 
              icon={Users} 
              delay="0.3s" 
            />
            <StatCard 
              title="Середній донат" 
              value={formatCurrency(stats.averageDonation)} 
              icon={Activity} 
              delay="0.4s" 
            />
          </div>

          <div className="grid grid-cols-2" style={{ marginBottom: '40px' }}>
            <DonationsChart data={stats.dailyStats} />
            <RecentTransactions transactions={transactions} />
          </div>

          {stats.contributors && stats.contributors.length > 0 && (
            <div className="grid grid-cols-2" style={{ marginBottom: '40px' }}>
              <TopContributorsPie 
                contributors={stats.contributors} 
                totalIncome={stats.totalIncome} 
              />
              <TopContributorsList 
                contributors={stats.contributors} 
                totalIncome={stats.totalIncome} 
              />
            </div>
          )}
        </>
      )}

      {stats && stats.error && (
        <div className="glass-card animate-fade-in" style={{ textAlign: 'center', color: '#ef4444' }}>
          {stats.error}
        </div>
      )}
    </div>
  );
}

export default App;
