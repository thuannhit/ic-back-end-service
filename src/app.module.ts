// Import Library
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';

import { HttpExceptionFilter } from './filters/http-exception.filter';

// import { MailerModule } from '@nestjs-modules/mailer';
// import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
// import { BullModule } from '@nestjs/bull';

// Import Controllers

// Import Modules
import { AuthModule } from '@modules/auth/auth.module';
import { UserModule } from '@modules/user/user.module';
import { MailerModule } from '@modules/mailer/mailer.module';
import { PropertyModule } from '@modules/property/property.module';
// import { LoggerMiddleware } from './middlewares/logger.middleware';
// import { PropertyModule } from './controllers/property/property.module';
// import { OrderModule } from '@controllers/order/order.module';
// import { AppController } from '@app/app.controller';

// Import Services
// import { AppService } from '@app/app.service';

@Module({
	imports: [
		TypeOrmModule.forRoot(),
		AuthModule,
		UserModule,
		PropertyModule,
		MailerModule,
		// PropertyModule,
		// OrderModule,
		// MailerModule.forRoot({
		// 	transport: {
		// 		host: 'smtp.gmail.com',
		// 		port: 465,
		// 		secure: false,
		// 		auth: {
		// 			user: 'lastmilevn.develop@gmail.com',
		// 			pass: '123@abc!',
		// 		},
		// 	},
		// 	defaults: {
		// 		from: '"No Reply" <vinh.nguyen2303@outlook.com>',
		// 	},
		// 	template: {
		// 		dir: process.cwd() + 'mail/templates',
		// 		adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
		// 		options: {
		// 			strict: true,
		// 		},
		// 	},
		// }),
	],
	controllers: [],
	providers: [
		{
			provide: APP_FILTER,
			useClass: HttpExceptionFilter,
		},
	],
})
export class AppModule { }
