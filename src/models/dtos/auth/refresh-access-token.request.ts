import { IsEmail, IsIn, IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator';

export class RefreshAccessTokenRequestDTO {
    @IsNotEmpty({ message: 'refresh_token is not be empty' })
    refresh_token: string;
}