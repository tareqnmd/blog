import AdminNav from '../AdminNav';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-rows-[auto_1fr] min-h-screen gap-6 pb-6">
      <AdminNav />
      <main className="container">{children}</main>
    </div>
  );
};

export default AdminLayout;
