import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { formatCurrency, COLORS } from '../utils/format';

export const TopContributorsPie = ({ contributors, totalIncome }) => (
  <div className="glass-card animate-fade-in" style={{ animationDelay: '0.7s', minHeight: '400px' }}>
    <h2 style={{ marginBottom: '24px' }}>Топ донаторів (Частка)</h2>
    <div style={{ height: '300px', width: '100%', minWidth: 0 }}>
      <ResponsiveContainer width="99%" height={300}>
        <PieChart>
          <Pie
            data={contributors.slice(0, 10)}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={5}
            dataKey="amount"
            nameKey="name"
          >
            {contributors.slice(0, 10).map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <RechartsTooltip 
            contentStyle={{ 
              backgroundColor: 'var(--bg-dark)', 
              border: '1px solid var(--glass-border)',
              borderRadius: '8px'
            }}
            formatter={(value, name) => [
              `${formatCurrency(value)} (${((value / totalIncome) * 100).toFixed(1)}%)`,
              name
            ]}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>
);
