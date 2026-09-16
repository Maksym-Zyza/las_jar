import { formatCurrency, COLORS } from '../utils/format';

export const TopContributorsList = ({ contributors, totalIncome }) => (
  <div className="glass-card animate-fade-in" style={{ animationDelay: '0.8s' }}>
    <h2 style={{ marginBottom: '24px' }}>Список донаторів (Топ 10)</h2>
    <div style={{ maxHeight: '300px', overflowY: 'auto', paddingRight: '8px' }}>
      {contributors.slice(0, 10).map((c, idx) => (
        <div key={idx} className="transaction-item">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: COLORS[idx % COLORS.length], flexShrink: 0 }}></div>
            <div style={{ fontWeight: 500 }}>{c.name}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontWeight: 600, color: 'var(--success)' }}>
              {formatCurrency(c.amount)}
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              {((c.amount / totalIncome) * 100).toFixed(1)}%
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
