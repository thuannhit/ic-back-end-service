import { HttpException, HttpStatus } from '@nestjs/common'
import { INTERNAL_ERROR_CODE } from '@commons/constants'

export class UnAuthorizedException extends HttpException {
    constructor(INTERNAL_ERROR_MESSAGE: string, INTERNAL_ERROR_CODE: INTERNAL_ERROR_CODE) {
        super({ 
            internalErrorCode: INTERNAL_ERROR_CODE, 
            internalErrorMessage: INTERNAL_ERROR_MESSAGE 
        }, HttpStatus.UNAUTHORIZED);
    }
}