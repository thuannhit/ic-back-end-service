import { IsEmail, IsIn, IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator';

export class UserRegistrationRequest {

  @IsNotEmpty({ message: 'fullName必須項目を入力してください。' })
  fullName: string

  @IsNotEmpty({ message: '必須項目を入力してください。' })
  kanaName: string

  @IsNotEmpty({ message: '必須項目を入力してください。' })
  companynName: string

  @IsNotEmpty({ message: '必須項目を入力してください。' })
  branchName: string

  @IsNotEmpty({ message: '必須項目を入力してください。' })
  password: string

  @IsNotEmpty({ message: '必須項目を入力してください。' })
  @IsEmail({}, {message: '「メール」の形式が正しくないので、再度入力してください。'})
  email: string

  @IsNotEmpty({ message: '必須項目を入力してください。' })
  tel: string

  @IsNotEmpty({ message: '必須項目を入力してください。' })
  postalCode: string

  @IsNotEmpty({ message: 'には，1件の値を選択してください。' })
  prefectureId: string

  @IsNotEmpty({ message: '必須項目を入力してください。' })
  address: string

  referralCode: string
}
