// Import Library
import {
	Controller,
	Request,
	Get,
	Post,
	Body,
	Query,
	Param,
	NotFoundException,
	Ip,
	UseGuards,
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
import { UserSearchRequest } from '@dtos/user/user-search.request';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { UserRegistrationRequest } from '@dtos/user/user-registration.request';
import { UserLoginRequest } from '@dtos/user/user-login.request';

//Import Entities

@Controller('users')
export class UserController {
	constructor(
		private userService: UserService,
	)
	{}

	@Post('register')
	doRegisterUser(@Body() userRegistrationData: UserRegistrationRequest) {
		console.log(userRegistrationData)
		const responseData = this.userService.createNewUser(userRegistrationData)
		return ResponseCommon.returnResponseSuccess(responseData);
	}
}
