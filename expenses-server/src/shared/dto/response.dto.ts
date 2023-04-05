export class ResponseDto<T> {
    isError: boolean;
    data: T;
    errors: string[];
    statusCode: number;
}
