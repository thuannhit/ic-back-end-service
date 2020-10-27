import { IsEmail, IsIn, IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator';

export class UserLoginResponse {
    @IsNotEmpty({message: 'accessToken is not be emply'})
    accessToken: string;

    tokenType?: string = 'bearer';

    @IsNotEmpty({ message: 'expiresIn is not be emply'})
    expiresIn: number | string;

    refreshToken?: string;

    type?: string;
}