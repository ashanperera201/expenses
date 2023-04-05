import { Injectable } from '@nestjs/common';

import { ResponseDto } from '../shared';

@Injectable()
export class ResponseMapperService {
    serviceResponseMapper = <T>(responseData: T, errors: any, isError = false, statusCode = 200): ResponseDto<T> => {
        const serviceResponse: ResponseDto<T> = new ResponseDto();
        serviceResponse.data = responseData;
        serviceResponse.errors = errors;
        serviceResponse.isError = isError;
        serviceResponse.statusCode = statusCode;
        return serviceResponse;
    };
}
