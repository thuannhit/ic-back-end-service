import { Injectable, Logger, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { sign, SignOptions, verify } from 'jsonwebtoken';
import * as moment from 'moment';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '@interfaces/index';
import { UserLoginResponse } from '@dtos/user/user-login.response';
// import { RefreshToken } from '../models/refresh-token.model';
// import * as uuid from 'uuid';
import { UserTokensRepository } from '@repositories/user_tokens.repository';
import { jwtConstants } from '@commons/constants/auth.constants'
import { UserDto } from '@dtos/user/user'
import { AuthService } from '@services/auth.service'
import { UserService } from '@services/user.service'
import { toUserDto } from '@app/utilities/mapper';
import { User } from '@app/models/entities/user.entity';
@Injectable()
export class TokenService {
    private readonly logger = new Logger(TokenService.name);


    // @todo: should be put in redis cache
    // private readonly usersExpired: number[] = [];

    constructor(
        // @InjectModel(RefreshToken.modelName) tokenModel: ModelType<RefreshToken>,
        private readonly userTokenRepository: UserTokensRepository,
        private readonly jwtService: JwtService,
        private readonly userService: UserService,

    ) {

    }

    public getJwtAccessToken({ email, user_id }: JwtPayload): string {
        const payload: JwtPayload = { email, user_id };
        const token = this.jwtService.sign(payload, {
            secret: jwtConstants.access_secret_key,
            expiresIn: `${jwtConstants.access_expired_time}`
        }
        );
        return token
        // return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${jwtConstants.access_expired_time}`;
    }

    public getJwtRefreshToken({ email, user_id }: JwtPayload): string {
        const payload: JwtPayload = { email, user_id };
        const token = this.jwtService.sign(payload, {
            secret: jwtConstants.refresh_secret_key,
            expiresIn: jwtConstants.refresh_expired_time
        });
        return token
        // const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${jwtConstants.refresh_expired_time}`;
        // return {
        //     cookie,
        //     token
        // }
    }

    async getAccessTokenFromRefreshToken(
        oldRefreshToken: string,
        oldAccessToken: string,
    ): Promise<any> {
        try {
            // check if refresh token exist in database
            const oOldRefreshToken = await this.userTokenRepository.findOne({ token_value: oldRefreshToken });
            const currentDate = new Date().getTime();
            if (!oOldRefreshToken) {
                throw new HttpException('Refresh token not found', HttpStatus.UNAUTHORIZED);
            }
            // if (oOldRefreshToken.expires_at < currentDate) {
            //     throw new Error('Refresh token expired');
            // }
            // Refresh token is still valid
            // Generate new access token
            const oldPayload = await this.validateToken(oldAccessToken, jwtConstants.access_secret_key, true);
            const newPayload: JwtPayload = {
                user_id: oldPayload.user_id,
                email: oldPayload.email,
            };
            const newAccessToken = await this.getJwtAccessToken(newPayload);
            // Remove old refresh token and generate a new one
            await this.userTokenRepository.delete(oOldRefreshToken.token_id);

            const newRefreshToken = await this.getJwtRefreshToken(newPayload);

            return { newRefreshToken, newAccessToken }
                ;
        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }

    // private _createToken({ email }: JwtPayload): any {
    //     const expiresIn = jwtConstants.expiresIn;

    //     const email_email: JwtPayload = { email };
    //     const accessToken = this.jwtService.sign(email_email);
    //     return {
    //         expiresIn,
    //         accessToken,
    //     };
    // }

    // async createAccessToken(
    //     jwtPayload: JwtPayload
    // ): Promise<any> {
    //     // If expires is negative it means that token should not expire
    //     // Generate unique id for this token
    //     return this._createToken(jwtPayload);

    // }

    // async createRefreshToken(tokenContent: {
    //     email: string;
    // }): Promise<string> {
    //     const { email } = tokenContent;

    //     const token: InstanceType<RefreshToken> = new RefreshToken.model();

    //     const refreshToken = randomBytes(64).toString('hex');

    //     token.userId = Types.ObjectId(userId);
    //     token.value = refreshToken;
    //     token.clientId = clientId;
    //     token.ipAddress = ipAddress;
    //     token.expiresAt = moment()
    //         .add(this.refreshTokenTtl, 'd')
    //         .toDate();

    //     await this.create(token);

    //     return refreshToken;
    // }

    // /**
    //  * Remove all the refresh tokens associated to a user
    //  * @param userId id of the user
    //  */
    // async deleteRefreshTokenForUser(userId: string) {
    //     await this.delete({ userId: Types.ObjectId(userId) });
    //     await this.revokeTokenForUser(userId);
    // }

    // /**
    //  * Removes a refresh token, and invalidated all access tokens for the user
    //  * @param userId id of the user
    //  * @param value the value of the token to remove
    //  */
    // async deleteRefreshToken(userId: string, value: string) {
    //     await this.delete({ value });
    //     await this.revokeTokenForUser(userId);
    // }

    async decodeAndValidateJWT(token: string): Promise<any> {
        if (token) {
            try {
                const payload = await this.validateToken(token, jwtConstants.access_secret_key);
                return await this.validatePayload(payload);
            } catch (error) {
                return null;
            }
        }
    }

    async validatePayload(payload: JwtPayload): Promise<UserDto> {
        return this.userService.findByPayload(payload)
    }

    private async validateToken(
        token: string, key: string,
        ignoreExpiration: boolean = false,
    ): Promise<JwtPayload> {
        return verify(token, key, {
            ignoreExpiration,
        }) as JwtPayload;
    }

    // private async isBlackListed(id: string, expire: number): Promise<boolean> {
    //     return this.usersExpired[id] && expire < this.usersExpired[id];
    // }

    // private async revokeTokenForUser(userId: string): Promise<any> {
    //     this.usersExpired[userId] = moment()
    //         .add(this.expiresInDefault, 's')
    //         .unix();
    // }
}