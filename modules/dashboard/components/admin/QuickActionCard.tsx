import Link from 'next/link';
import { ReactNode } from 'react';

export type QuickActionCardProps = {
  href: string;
  title: string;
  description: string;
  icon: ReactNode;
  iconWrapperClassName: string;
};

const QuickActionCard = ({
  href,
  title,
  description,
  icon,
  iconWrapperClassName,
}: QuickActionCardProps) => (
  <Link
    href={href}
    className="flex flex-col items-center text-center gap-3 rounded-2xl border border-border bg-card-background p-6 hover:shadow-md hover:-translate-y-0.5 transition-all group"
  >
    <div className={iconWrapperClassName}>{icon}</div>
    <div>
      <h3 className="font-semibold text-foreground mb-1">{title}</h3>
      <p className="text-sm text-muted">{description}</p>
    </div>
  </Link>
);

export default QuickActionCard;
