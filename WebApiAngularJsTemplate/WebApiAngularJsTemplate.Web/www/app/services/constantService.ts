module Services {

    export interface IConstantService
    {
        fileGetUrl: string;
        mimeTypes: IMimeTypes;
    }

    export interface IMimeTypes {
        xls: string;
        xlsx: string;
    }

    angular.module("app").constant("constantService", <IConstantService>{
        fileGetUrl: "/api/files/getFileByLink/",
        mimeTypes: {
            xls: "application/vnd.ms-excel",
            xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        }
    });
}