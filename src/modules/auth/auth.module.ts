import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from '../../services/auth.service';
import { UserModule } from '../user/user.module';

import { PassportModule } from '@nestjs/passport';
import { JwtAccessTokenStrategy } from './jwt-access-token.strategy';
import { JwtRefreshTokenStrategy } from './jwt-refresh-token.strategy';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../../commons/constants/auth.constants';

// Import Entities
import { User } from '@entities/user.entity';

// Import Repositories
import { UserRepository } from '@repositories/user.repository';
import { UserTokensRepository } from '@repositories/user_tokens.repository';

// Import Controllers
import {
  AuthController
} from './auth.controller';

// Import Services
import { UserService } from '@services/user.service';
import { TokenService } from '@services/token.service';
import { TokenType } from '@app/commons/constants';

@Module({
  controllers: [AuthController],
  imports: [
    UserModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.register({
      secret: jwtConstants.access_secret_key,
      signOptions: {
        expiresIn: jwtConstants.access_expired_time },
    }),
    TypeOrmModule.forFeature([User, UserRepository, UserTokensRepository])
  ],
  providers: [
    AuthService,
    UserService,
    LocalStrategy,
    JwtAccessTokenStrategy,
    JwtRefreshTokenStrategy,
    TokenService
  ],
  exports: [
    AuthService,
    UserService,
    JwtAccessTokenStrategy,
    TokenService
  ],

})
export class AuthModule { }
