import { Injectable, Dependencies, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserLoginRequest } from '@dtos/user/user-login.request';
import { RefreshAccessTokenRequestDTO } from '@dtos/auth/refresh-access-token.request';
import { User } from '@entities/user.entity';
import { TokenType } from '@commons/constants';
import { UserSearchRequest } from '@dtos/user/user-search.request';
import { UserDto } from '@dtos/user/user';
import { JwtPayload, LoginResult } from '@interfaces/index';
import { UserService } from '@services/user.service'
import { TokenService } from '@services/token.service'
import { UserTokensRepository } from '@repositories/user_tokens.repository';
import { use } from 'passport';
import { UpdateResult } from 'typeorm';
@Injectable()
export class AuthService {

    constructor(
        private jwtService: JwtService,
        private readonly userService: UserService,
        private readonly userTokensRepository: UserTokensRepository,
        private readonly tokenService: TokenService,
    ) { }

    async doLogin(user: UserDto): Promise<LoginResult> {
        // generate and sign token
        const payload: JwtPayload = { email: user.email, user_id: user.id }
        const accessToken = this.tokenService.getJwtAccessToken(payload);
        const refreshToken
            = this.tokenService.getJwtRefreshToken(payload);

        await this.userService.setCurrentRefreshToken(refreshToken, user.id);
        return { accessToken, refreshToken };

    }
    async doRefreshAccessToken(user: UserDto): Promise<LoginResult> {
        // generate and sign token
        const payload: JwtPayload = { email: user.email, user_id: user.id }
        const accessToken = this.tokenService.getJwtAccessToken(payload);
        const refreshToken
            = this.tokenService.getJwtRefreshToken(payload);

        await this.userService.setCurrentRefreshToken(refreshToken, user.id);
        return { accessToken, refreshToken };

    }

    async doRemoveRefreshToken(user: UserDto): Promise<any> {
        try {
            const updateRs: UpdateResult = await this.userTokensRepository.update({ user_id: user.id, token_type: TokenType.RefreshToken }, { token_value: '' });
            const avv = updateRs.affected || 0
            if (avv > 0) return 'Logged out'
            return 'Can not log out'
        } catch (error) {
            throw new HttpException('Failed to logout', HttpStatus.BAD_REQUEST);
        }
    }
}