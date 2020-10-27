// Import Library
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Import Modules
import { CommonModule } from '@app/modules/common.module';

// import {AuthModule} from '@modules/auth/auth.module'
// Import Controllers
import { UserController } from './user.controller';

// Import Services
import { UserService } from '@services/user.service';

// Import Entities
import { User } from '@entities/user.entity';

// Import Repositories
import { UserRepository } from '@repositories/user.repository';

// Import Repositories
import { UserTokensRepository } from '@repositories/user_tokens.repository';

@Module({
	controllers: [UserController],
	imports: [CommonModule, TypeOrmModule.forFeature([User, UserRepository, UserTokensRepository])],
	providers: [UserService],
	exports: [UserService],
})
export class UserModule {}
