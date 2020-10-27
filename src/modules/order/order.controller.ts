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

// Import Services

//Import DTOs
import { MailSendRequest } from '@dtos/mailer/mail-send.request';

//Import Entities

@Controller('order')
export class OrderController {
	constructor() {}

	@Get('init')
	doSendMail(@Body() mailSendData: MailSendRequest) {
	}
}
