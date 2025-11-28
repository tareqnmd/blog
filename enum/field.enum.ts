export enum SessionHeader {
  AUTHORIZATION = 'Authorization',
}

export enum AccountAuthType {
  GOOGLE = 'google',
}

export enum QuerySortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export enum AccountField {
  PROVIDER = 'provider',
  ID_TOKEN = 'id_token',
}

export enum SessionField {
  USER = 'user',
  TOKEN = 'token',
}

export enum TokenField {
  REFRESH_TOKEN = 'refreshToken',
  ACCESS_TOKEN = 'accessToken',
  ACCESS_TOKEN_EXPIRES_IN = 'accessTokenExpiresIn',
  REFRESH_TOKEN_EXPIRES_IN = 'refreshTokenExpiresIn',
}

export enum UserField {
  ID = 'id',
  NAME = 'name',
  EMAIL = 'email',
  IMAGE = 'image',
  ROLE = 'role',
}
