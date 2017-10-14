module Services {

    export interface IAlertService {
        renderErrorMessage(response: any): void;
        renderSuccessMessage(response: any): void;
        renderWarningMessage(response: any): void;
        renderInformationalMessage(response: any): void;
        success(response: any, timeToLive?: number): void;
        error(response: any, timeToLive?: number): void;
        info(response: any, timeToLive?: number): void;
        warning(response: any, timeToLive?: number): void;
        getMessageFromResponse(response: any): string | String;
    }

    export class AlertService implements IAlertService {

        static $inject = ["$rootScope", "growl", "$sce", "$translate"];

        constructor(
            private $rootScope,
            private growl,
            private $sce,
            private $translate
        ) {

        }

        renderErrorMessage(response: any): void {
            this.error(this.getMessageFromResponse(response));
        }

        renderSuccessMessage(response: any): void {
            this.success(this.getMessageFromResponse(response));
        }

        renderWarningMessage(response: any): void {
            this.warning(this.getMessageFromResponse(response));
        }

        renderInformationalMessage(response: any): void {
            this.info(this.getMessageFromResponse(response));
        }

        success(response: any, timeToLive?: number): void {
            this.growl.success(this.getMessageFromResponse(response), { ttl: timeToLive });
        }

        error(response: any, timeToLive?: number): void {
            this.growl.error(this.getMessageFromResponse(response), { ttl: timeToLive });
        }

        info(response: any, timeToLive?: number): void {
            this.growl.info(this.getMessageFromResponse(response), { ttl: timeToLive });
        }

        warning(response: any, timeToLive?: number): void {
            this.growl.warning(this.getMessageFromResponse(response), { ttl: timeToLive });
        };

        getMessageFromResponse(response: any): string | String {
            if (response && response.modelState && response.modelState.error && response.modelState.error[0]) {
                return response.modelState.error[0];
            } else if (response.exceptionMessage) {
                return response.exceptionMessage;
            } else if (response.message) {
                return response.message;
            } else if (response.messageHtml) {
                return this.$sce.trustAsHtml(response.messageHtml);
            } else if (response.data && response.data.message) {
                return response.data.message;
            } else if (response && (typeof response === "string" || response instanceof String)) {
                return response;
            } else {
                return this.$translate.instant("UnknownError");
            }
        }

    }

    angular.module("app").service("alertService", AlertService);
}