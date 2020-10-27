import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '@services/auth.service';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtPayload } from '@interfaces/index';
import { UserDto } from '@dtos/user/user';
import { jwtConstants } from '@commons/constants/auth.constants'
import { TokenService } from '@services/token.service'
import { ForbiddenException } from '@custom-exceptions/*'
import { INTERNAL_ERROR_CODE } from '@commons/constants'
@Injectable()
export class JwtAccessTokenStrategy extends PassportStrategy(Strategy, 'jwt-access-token') {
    constructor(private readonly tokenService: TokenService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                ExtractJwt.fromAuthHeaderAsBearerToken(),
                // ignoreExpiration: false,
                // ExtractJwt.fromUrlQueryParameter('access_token'),
            ]),
            ignoreExpiration: true,
            secretOrKey: jwtConstants.access_secret_key,
        });
    }

    async validate(payload: JwtPayload): Promise<UserDto> {
        console.log('validate')
        const user = await this.tokenService.validatePayload(payload);
        if (!user) {
            throw new ForbiddenException('User does not exist', INTERNAL_ERROR_CODE.FORBIDDEN);
        }
        console.log('user', user)
        return user;
    }
}