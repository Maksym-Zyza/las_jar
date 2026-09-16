import { RefreshCw } from 'lucide-react';

export const Header = ({ title, lastFetchTime, loading, onRefresh }) => (
  <header style={{ marginBottom: '40px', textAlign: 'center' }} className="animate-fade-in">
    <h1 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '8px' }}>
      {title || 'Mono Donation Dashboard'}
    </h1>
    <div style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
      <span>Збір у реальному часі</span>
      {lastFetchTime && (
        <span 
          onClick={onRefresh}
          style={{ 
            cursor: 'pointer',
            fontSize: '0.875rem', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '6px', 
            background: 'rgba(255,255,255,0.05)', 
            padding: '4px 12px', 
            borderRadius: '16px',
            transition: 'var(--transition)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} style={{ color: 'var(--accent)' }} /> 
          Оновлено: {lastFetchTime.toLocaleTimeString('uk-UA')}
        </span>
      )}
    </div>
  </header>
);
