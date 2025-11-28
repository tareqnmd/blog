import { UserRole } from '@/enum';
import { Routes } from '@/enum/routes.enum';
import { auth } from '@/lib';
import NavLink from './NavLink';
import NavWrapper from './NavWrapper';

const PublicNav = async () => {
  const session = await auth();
  const user = session?.user;
  return (
    <NavWrapper>
      <NavLink href={Routes.HOME}>Home</NavLink>
      <NavLink href={Routes.BLOGS} childCheck>
        Blogs
      </NavLink>
      {user && user.role === UserRole.ADMIN && <NavLink href={Routes.ADMIN}>Admin</NavLink>}
    </NavWrapper>
  );
};

export default PublicNav;
