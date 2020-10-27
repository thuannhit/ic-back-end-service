/**
 * Powered by Lasmile-Works Viet Nam
 * @author Lastmile-Worksのタンビン
 * @namespace Commons
 * @classname ResponseCommon
 **/

import { HttpStatus } from '@nestjs/common';

export class ResponseCommon {
  /**
   * 200 OK
   * The request has succeeded. The meaning of the success depends on the HTTP method
   * @author Lastmile-Worksのタンビン
   * @method sync
   * @param objData?: Object
   * @return httpResponse: Object
   **/
  public static returnResponseSuccess(objData?: Object) {
    return {
      httpStatusCode: HttpStatus.OK,
      timestamp: new Date().toISOString(),
      response: {
        statusCode: HttpStatus.OK,
        data: objData,
      },
    };
  }

  /**
   * 400 Bad Request
   * The server could not understand the request due to invalid parameters or missing information
   * @author Lastmile-Worksのタンビン
   * @method sync
   * @param objData?: Object
   * @return httpResponse: Object
   **/
  public static returnResponseBadRequest(objData?: Object) {
    return {
      httpStatusCode: HttpStatus.OK,
      response: {
        statusCode: HttpStatus.BAD_REQUEST,
        data: objData,
      },
    };
  }
}
