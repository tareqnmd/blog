'use client';
import { cn } from '@/lib/cn.lib';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

const NavLink = ({
  href,
  children,
  childCheck = false,
}: {
  href: string;
  children: React.ReactNode;
  childCheck?: boolean;
}) => {
  const pathname = usePathname();
  const isActive = useMemo(() => {
    if (childCheck) {
      return pathname.includes(href);
    }
    return pathname === href;
  }, [pathname, href, childCheck]);

  return (
    <Link href={href} className={cn(isActive && 'font-bold')}>
      {children}
    </Link>
  );
};

export default NavLink;
