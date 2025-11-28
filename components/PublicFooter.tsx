const PublicFooter = () => {
  return (
    <footer className="border-t border-border py-4">
      <div className="container text-center text-sm text-muted">
        <p>&copy; {new Date().getFullYear()} Academy. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default PublicFooter;
