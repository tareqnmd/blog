import PublicFooter from '../PublicFooter';
import PublicNav from '../PublicNav';

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen">
      <PublicNav />
      <main>{children}</main>
      <PublicFooter />
    </div>
  );
};

export default PublicLayout;
