// Import Library
import { Module } from '@nestjs/common';

// Import Modules
import { CommonModule } from '@app/modules/common.module';

// Import Controllers
import { MailerController } from './mailer.controller';

// Import Services
import { MailerService } from '@services/mail.service';

// Import Repositories

@Module({
  controllers: [MailerController],
  imports: [CommonModule],
  providers: [MailerService],
  exports: [MailerService],
})
export class MailerModule {}
