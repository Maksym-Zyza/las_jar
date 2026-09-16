import { formatCurrency } from '../utils/format';

export const RecentTransactions = ({ transactions }) => (
  <div className="glass-card animate-fade-in" style={{ animationDelay: '0.6s' }}>
    <h2 style={{ marginBottom: '24px' }}>Останні транзакції</h2>
    <div style={{ maxHeight: '300px', overflowY: 'auto', paddingRight: '8px' }}>
      {transactions && transactions.length > 0 ? transactions.map((tx, idx) => (
        <div key={idx} className="transaction-item">
          <div>
            <div style={{ fontWeight: 500, marginBottom: '4px' }}>{tx.description || 'Донат'}</div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              {tx.comment || 'Без коментаря'} • {new Date(tx.time).toLocaleString('uk-UA')}
            </div>
          </div>
          <div style={{ fontWeight: 600, color: 'var(--success)' }}>
            +{formatCurrency(tx.amount)}
          </div>
        </div>
      )) : (
        <div style={{ color: 'var(--text-muted)', textAlign: 'center', marginTop: '40px' }}>
          Немає транзакцій
        </div>
      )}
    </div>
  </div>
);
