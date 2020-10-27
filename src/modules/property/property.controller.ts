// Import Library
import {
    Controller,
    Request,
    Get,
    Post,
    Body,
    Header,
    Req,
    Query,
    Param,
    NotFoundException,
    Ip,
    UseGuards,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiResponse,
    ApiOperation, ApiTags,
} from '@nestjs/swagger';
// Import Common
import { ResponseCommon } from '@app/commons/response';

// Import Controllers

// Import Modules
import { AuthModule } from '@app/modules/auth/auth.module';

// Import Services
// import { UserService } from '@services/user.service';
import { AuthService } from '@services/auth.service';

//Import DTOs
import { UserSearchRequest } from '@dtos/user/user-search.request';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { UserRegistrationRequest } from '@dtos/user/user-registration.request';
import { UserLoginRequest } from '@dtos/user/user-login.request';
import { PropertyCreationRequestDTO } from '@dtos/property';
import  JwtAuthenticationGuard  from '@modules/auth/jwt-access-token-auth.guard';
import { Headers } from 'nodemailer/lib/mailer';
import { PropertyService } from '@services/property.service'
//Import Entities

@Controller('properties')
export class PropertyController {
    constructor(
        private propertyService: PropertyService,
    ) { }

    @ApiOperation({ summary: 'Create property' })
    @ApiResponse({ status: 201, description: 'The property has been successfully created.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @UseGuards(JwtAuthenticationGuard)
    @Post()
    async create(@Req() header: any, @Body() articleData: PropertyCreationRequestDTO) {
        const responseData = await this.propertyService.createNewProperty(articleData)
        console.log('articleData', articleData)
        console.log('responseData', responseData)
        return ResponseCommon.returnResponseSuccess(responseData);
    }

}
