import { Request } from 'express';
import { UserDto } from '@dtos/user/user';

export interface RequestWithUser extends Request {
    user: UserDto;
}

// export RequestWithUser;