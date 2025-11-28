import { Routes } from '@/enum';
import NavLink from './NavLink';
import NavWrapper from './NavWrapper';

const AdminNav = () => {
  return (
    <NavWrapper>
      <NavLink href={Routes.ADMIN}>Dashboard</NavLink>
      <NavLink childCheck href={Routes.ADMIN_BLOGS}>
        Blogs
      </NavLink>
      <NavLink href={Routes.ADMIN_CATEGORIES}>Categories</NavLink>
    </NavWrapper>
  );
};

export default AdminNav;
