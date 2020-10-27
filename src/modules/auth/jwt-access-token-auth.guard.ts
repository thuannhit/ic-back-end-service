import { Injectable, ExecutionContext, UnauthorizedException} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// import {} from '@interfaces/Jwt'
@Injectable()
export default class JwtAccessTokenAuthGuard extends AuthGuard('jwt-access-token') { 
    canActivate(context: ExecutionContext) {
        console.log('canActivate')
        return super.canActivate(context);
    }

    handleRequest(err:any, user:any, info:any) {
        // console.log('error', err)
        // console.log('user', user)
        // console.log('info', info)
        console.log('handleRequest')
        // You can throw an exception based on either "info" or "err" arguments
        if (err || !user) {
            throw err || new UnauthorizedException();
        }
        return user;
    }
}