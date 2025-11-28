import 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';
import { ISessionUser } from './common';
import { SessionField } from './enum';

declare module 'next-auth' {
  interface Session {
    [SessionField.USER]: ISessionUser;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    user: ISessionUser;
  }
}
