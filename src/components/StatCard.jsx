export const StatCard = ({ title, value, icon: Icon, delay }) => (
  <div className="glass-card animate-fade-in" style={{ animationDelay: delay }}>
    <div className="icon-box">
      <Icon size={24} />
    </div>
    <div className="stat-label">{title}</div>
    <div className="stat-value">{value}</div>
  </div>
);
