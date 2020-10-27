// Import Library
import { Module } from '@nestjs/common';

// Import Modules
import { CommonModule } from '@app/modules/common.module';

// Import Controllers
import { OrderController } from './order.controller';

// Import Services

// Import Repositories

@Module({
  controllers: [OrderController],
  imports: [CommonModule],
  providers: [],
  exports: [],
})
export class UserModule {}
