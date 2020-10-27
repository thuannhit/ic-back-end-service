// Import Library
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

//Import DTOs
import { MailSendRequest } from '@dtos/mailer/mail-send.request';

//Import Utilities
import DatetimeUtil from '@utilities/datetime.util';

//Configs
const sendGridMail = require('@sendgrid/mail');

/**
 * @author Lastmile-Worksのタンビン
 * @namespace Services
 * @classname MailerService
 **/
@Injectable()
export class MailerService {
  constructor() {
    sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);
  }

  /**
   * Send email with parameter
   * @author Lastmile-Worksのタンビン
   * @namespace Services
   * @method sync
   * @param mailData: MailSendRequest
   * @returns Promise<any>
   **/
  async doSendMail(mailData: MailSendRequest): Promise<HttpStatus> {
    //Send mail
    return (async () => {
      try {
        //Calculate scheduler for send
        let currentDateTime: Date = DatetimeUtil.getCurrentDateTime();
        currentDateTime.setMinutes(
          currentDateTime.getMinutes() + Number(process.env.SENDGRID_LAZY_SEND)
        );
        const schedulerSend = DatetimeUtil.convertDateStringToTimeStamp(
          DatetimeUtil.getCurrentDateTime()
        );

        //Init Email Content
        const mailContent = {
          to: mailData.toEmail,
          from: mailData.fromEmail,
          subject: mailData.title,
          send_at: schedulerSend,
          html: mailData.body,
        };
        await sendGridMail.send(mailContent);
        return HttpStatus.OK;
      } catch (error) {
        console.error(error);
        console.error(error.response.body);
        return HttpStatus.INTERNAL_SERVER_ERROR;
      }
    })();
  }

  async doSendMailTest(mailData: MailSendRequest): Promise<any> {
    const msg = {
      to: 'enjoyvinh@gmail.com', // Change to your recipient
      from: 'vinh.nguyen2303@outlook.com', // Change to your verified sender
      subject: 'Sending with SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };

    (async () => {
      try {
        await sendGridMail.send(msg);
        return 'success';
      } catch (error) {
        console.error(error);

        if (error.response) {
          console.error(error.response.body);

          return error.response.body;
        }
      }
    })();
  }
}
