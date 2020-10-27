import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../services/user.service';
import { UserDto } from '@dtos/user/user';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        private userService: UserService
    ) {
        super({ usernameField: 'email'});
    }

    async validate(email: string, password: string): Promise<UserDto> {
        const user: UserDto = await this.userService.getUserIfPasswordMatches(email, password);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}