//Import Library
import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { BadRequestException } from '@custom-exceptions/*'
import { Request, Response } from 'express';

/**
 * Powered by Lasmile-Works Viet Nam
 * @author thuan.nguyen
 * @namespace filters
 * @classname CustomBadRequestExceptionFilter
 **/
@Catch(BadRequestException)
export class CustomBadRequestExceptionFilter implements ExceptionFilter {
    catch(exception: BadRequestException, host: ArgumentsHost) {

        //Init ctx variable
        const ctx = host.switchToHttp();
        const requestData = ctx.getRequest<Request>();
        const responseData = ctx.getResponse<Response>();
        const httpStatusCode = exception.getStatus();
        //Handler Http Exception
        responseData.json({
            httpStatusCode: HttpStatus.BAD_REQUEST,
            timestamp: new Date().toISOString(),
            path: requestData.url,
            response: exception.getResponse(),
        });
    }
}
