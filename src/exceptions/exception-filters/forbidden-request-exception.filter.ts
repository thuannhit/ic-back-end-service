//Import Library
import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { ForbiddenException } from '@custom-exceptions/*'
import { Request, Response } from 'express';

/**
 * Powered by Lasmile-Works Viet Nam
 * @author thuan.nguyen
 * @namespace filters
 * @classname CustomBadRequestExceptionFilter
 **/
@Catch(ForbiddenException)
export class CustomForbiddenRequestExceptionFilter implements ExceptionFilter {
    catch(exception: ForbiddenException, host: ArgumentsHost) {

        //Init ctx variable
        const ctx = host.switchToHttp();
        const requestData = ctx.getRequest<Request>();
        const responseData = ctx.getResponse<Response>();
        const httpStatusCode = exception.getStatus();
        //Handler Http Exception
        responseData.status(httpStatusCode).json({
            httpStatusCode: HttpStatus.FORBIDDEN,
            timestamp: new Date().toISOString(),
            path: requestData.url,
            response: exception.getResponse(),
        });
    }
}
