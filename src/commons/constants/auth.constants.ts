export const jwtConstants = {
  access_secret_key: 'LastMile-Works_VietNam_2020',
  access_expired_time: '60s',
  saltRounds: 10,
  refresh_secret_key: 'LastMile-Works_Developers_Need_MacbookPro_2020',
  refresh_expired_time: '7200s'
};
export enum INTERNAL_ERROR_CODE {
  "INVALID_USER_NAME" = 'INVALID_USER_NAME',
  "INVALID_PASSWORD" = 'INVALID_PASSWORD',
  "ACCESS_TOKEN_EXPIRED" = 'ACCESS_TOKEN_EXPIRED',
  "REFRESH_TOKEN_EXPIRED" = 'REFRESH_TOKEN_EXPIRED',
  'FILE_NOT_FOUND' = 'FILE_NOT_FOUND',
  'UNAUTHORIZED' = 'UNAUTHORIZED',
  'FORBIDDEN' = 'FORBIDDEN',
}
