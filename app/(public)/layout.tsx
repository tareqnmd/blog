import PublicLayout from '@/components/layouts/PublicLayout';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <PublicLayout>{children}</PublicLayout>;
};

export default Layout;
