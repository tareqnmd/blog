import { ReactNode } from 'react';

export type StatCardProps = {
  label: string;
  value: string | number;
  icon: ReactNode;
  iconWrapperClassName: string;
};

const StatCard = ({ label, value, icon, iconWrapperClassName }: StatCardProps) => (
  <div className="rounded-2xl bg-card-background border border-border shadow-sm p-6 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-muted">{label}</p>
        <p className="text-2xl font-bold text-foreground mt-1">{value}</p>
      </div>
      <div className={iconWrapperClassName}>{icon}</div>
    </div>
  </div>
);

export default StatCard;
