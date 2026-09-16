import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '../utils/format';

export const DonationsChart = ({ data }) => (
  <div className="glass-card animate-fade-in" style={{ animationDelay: '0.5s', minHeight: '400px' }}>
    <h2 style={{ marginBottom: '24px' }}>Динаміка зборів</h2>
    <div style={{ height: '300px', width: '100%', minWidth: 0 }}>
      <ResponsiveContainer width="99%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="var(--accent)" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--glass-border)" vertical={false} />
          <XAxis 
            dataKey="date" 
            stroke="var(--text-muted)" 
            tick={{ fill: 'var(--text-muted)' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            stroke="var(--text-muted)" 
            tick={{ fill: 'var(--text-muted)' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => `${value / 100}`}
          />
          <RechartsTooltip 
            contentStyle={{ 
              backgroundColor: 'var(--bg-dark)', 
              border: '1px solid var(--glass-border)',
              borderRadius: '8px'
            }}
            formatter={(value) => [formatCurrency(value), 'Сума']}
          />
          <Area 
            type="monotone" 
            dataKey="amount" 
            stroke="var(--accent)" 
            fillOpacity={1} 
            fill="url(#colorAmount)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>
);
