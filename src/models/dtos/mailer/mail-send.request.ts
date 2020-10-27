import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MaxLength,
} from 'class-validator';

export class EmailDataType {
  email: string;
}

export class MailSendRequest {
  @IsNotEmpty({ message: '送信者必須項目を入力してください。' })
  @MaxLength(150, { message: 'Account必須項目を入力してください。' })
  @IsEmail({}, { message: '送信者必須項目を入力してください。' })
  fromEmail: EmailDataType;

  @IsNotEmpty({ message: '受信者必須項目を入力してください。' })
  @MaxLength(150, { message: 'Account必須項目を入力してください。' })
  @IsEmail({}, { message: '受信者必須項目を入力してください。' })
  toEmail: EmailDataType;

  @MaxLength(150, {
    each: true,
    message: 'Account必須項目を入力してください。',
  })
  @IsEmail(
    {},
    {
      each: true,
      message: 'CCメールに関して、メール必須項目を入力してください。',
    },
  )
  ccEmails?: EmailDataType[];

  @MaxLength(150, {
    each: true,
    message: 'Account必須項目を入力してください。',
  })
  @IsEmail(
    {},
    {
      each: true,
      message: 'BCCメールに関して、メール必須項目を入力してください。',
    },
  )
  bccEmails?: EmailDataType[];

  @IsNotEmpty({ message: 'タイトル必須項目を入力してください。' })
  @MaxLength(70, { message: 'タイトル必須項目を入力してください。' })
  title: string;

  @IsNotEmpty({ message: 'ボディ必須項目を入力してください。' })
  @MaxLength(5000, { message: 'ボディ必須項目を入力してください。' })
  body: string;
}
