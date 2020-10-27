import { IsEmail, IsIn, IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator';

export class UserLoginRequest {
  @IsNotEmpty({ message: 'Account必須項目を入力してください。' })
  email: string

  @IsNotEmpty({ message: 'パスワード必須項目を入力してください。' })
  password: string
}
