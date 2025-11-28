const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="container grid place-content-center py-4 h-full">{children}</div>;
};

export default AuthLayout;
