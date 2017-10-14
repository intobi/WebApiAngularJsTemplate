module Interfaces {
    export interface IBaseResponse<T> {
        message: string;
        result: T;
    }

    export interface IUploadBaseResponse<T> {
        config: any;
        data: IBaseResponse<T>;
        headers: any;
        status: any;
        statusText: any;
    }

}