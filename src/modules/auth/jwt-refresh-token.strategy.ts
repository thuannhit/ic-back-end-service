import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from '@commons/constants'
import { Request } from 'express';
import { UserDto } from '@dtos/user/user';
import { UserService } from '@services/user.service';
import { JwtPayload } from '@interfaces/index';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
    Strategy,
    'jwt-refresh-token'
) {
    constructor(
        private readonly userService: UserService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
                return request?.body?.refresh_token;
            }]),
            secretOrKey: jwtConstants.refresh_secret_key,
            passReqToCallback: true,
        });
    }

    async validate(request: Request, payload: JwtPayload): Promise<UserDto> {
        const refreshToken = request.body?.refresh_token;
        const user1 = await this.userService.getUserIfRefreshTokenMatches(refreshToken, payload);

        return user1
    }
}