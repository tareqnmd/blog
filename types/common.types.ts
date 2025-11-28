import { SessionField, TokenField, UserField, UserRole } from '@/enum';

export interface IUser {
  [UserField.ID]: string;
  [UserField.NAME]: string;
  [UserField.EMAIL]: string;
  [UserField.IMAGE]?: string;
  [UserField.ROLE]: UserRole;
}

export type ISessionToken = {
  [TokenField.ACCESS_TOKEN]: string;
  [TokenField.REFRESH_TOKEN]: string;
  [TokenField.ACCESS_TOKEN_EXPIRES_IN]: number;
  [TokenField.REFRESH_TOKEN_EXPIRES_IN]: number;
};

export type ISessionUser = IUser & {
  [SessionField.TOKEN]: ISessionToken;
  emailVerified: Date | null;
};
