//Import Library
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

/**
 * Powered by Lasmile-Works Viet Nam
 * @author Lastmile-Worksのタンビン
 * @namespace filters
 * @classname HttpExceptionFilter
 **/
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {

    //Init ctx variable
    const ctx = host.switchToHttp();
    const requestData = ctx.getRequest<Request>();
    const responseData = ctx.getResponse<Response>();
    const httpStatusCode = exception.getStatus();

    //Handler Http Exception
    responseData.status(httpStatusCode).json({
      httpStatusCode: HttpStatus.OK,
      timestamp: new Date().toISOString(),
      path: requestData.url,
      response: exception.getResponse(),
    });
  }
}
