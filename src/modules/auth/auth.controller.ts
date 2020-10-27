// Import Library
import {
    Controller,
    Request,
    Get,
    Req,
    Post,
    Body,
    Query,
    Param,
    NotFoundException,
    Ip,
    UseGuards,
    UseFilters,
} from '@nestjs/common';

// Import Common
import { ResponseCommon } from '@app/commons/response';

// Import Controllers

// Import Modules
import { AuthModule } from '@app/modules/auth/auth.module';

// Import Services
import { UserService } from '@services/user.service';
import { AuthService } from '@services/auth.service';

//Import DTOs
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { JwtRefreshTokenAuthGuard } from '../auth/jwt-refresh-token-auth.guard';
import JwtAuthenticationGuard from '@modules/auth/jwt-access-token-auth.guard';
import { RequestWithUser } from '@interfaces/request-with-user.interface';
import { CustomBadRequestExceptionFilter, CustomForbiddenRequestExceptionFilter } from '@custom-exceptions-filters/*'
//Import Entities

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) { }

    @UseGuards(LocalAuthGuard)
    @UseFilters(CustomBadRequestExceptionFilter)
    @Post('login')
    async doLogin(@Req() request: RequestWithUser) {
        const responseData = await this.authService.doLogin(request.user)
        return ResponseCommon.returnResponseSuccess(responseData);
    }

    @UseGuards(JwtRefreshTokenAuthGuard)
    @Post('refresh')
    async doRefresh(@Req() request: RequestWithUser) {
        const responseData = await this.authService.doRefreshAccessToken(request.user)
        return ResponseCommon.returnResponseSuccess(responseData);
    }

    @UseGuards(JwtAuthenticationGuard)
    @UseFilters(CustomForbiddenRequestExceptionFilter)
    @Post('log-out')
    async doLogout(@Req() request: RequestWithUser) {
        console.log('TEST')
        const responseData = await this.authService.doRemoveRefreshToken(request.user)
        return ResponseCommon.returnResponseSuccess(responseData);
    }
}
