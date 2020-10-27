import { User } from '@entities/user.entity';

export type TLoginResponse = {
  user: Readonly<Omit<User, 'password'>>;
  accessToken: string;
};
