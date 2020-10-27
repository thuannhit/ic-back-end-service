// Import Library
import { Controller, Post, Body, HttpStatus } from '@nestjs/common';

// Import Common
import { ResponseCommon } from '@app/commons/response';

// Import Controllers

// Import Modules

// Import Services
import { MailerService } from '@services/mail.service';

//Import DTOs
import { MailSendRequest } from '@dtos/mailer/mail-send.request';

//Import Entities

@Controller('mailer')
export class MailerController {
  constructor(private mailerService: MailerService) {}

  @Post('send-test')
  async doSendMail(@Body() mailData: MailSendRequest) {
    const responseData = await this.mailerService.doSendMail(mailData);
    return responseData === HttpStatus.OK
      ? ResponseCommon.returnResponseSuccess('メールを送ることが完了しました。')
      : ResponseCommon.returnResponseBadRequest(
          'メールを送る時にエラーがあった。',
        );
  }
}
