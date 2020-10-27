import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import { UserTokens } from '@app/models/entities/tro_user_tokens.entity';
@Injectable()
@EntityRepository(UserTokens)
export class UserTokensRepository extends Repository<UserTokens> {
}
