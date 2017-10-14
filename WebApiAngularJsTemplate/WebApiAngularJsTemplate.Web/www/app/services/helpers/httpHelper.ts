module Helpers {
    import HttpService = angular.IHttpService;
    import BlockUiService = angular.blockUI.blockUIService;
    import Promise = angular.IPromise;

    export interface IHttpHelper {
        http(delegate, blockUI: boolean): Promise<any>;
        onSendRequest(showLoadingOverAll: boolean): void;
        onGetResponse(showLoadingOverAll: boolean): void;
    }

    export class HttpHelper implements  IHttpHelper {
        blockUIRequestsCount = 0;

        constructor(
            private $q: ng.IQService,
            private $http: HttpService,
            private $timeout: ng.ITimeoutService,
            private blockUI: BlockUiService,
            private growl) {
        }

        static $inject = ["$q", "$http", "$timeout", "blockUI", "growl"];

        http(delegate, blockUI = false): Promise<any> {
            this.onSendRequest(blockUI);
            const deferred = this.$q.defer();
            delegate().then(successResponse => {
                const data = successResponse.data;
                deferred.resolve(data);
                this.onGetResponse(blockUI);
            }, errorResponse => {
                const data = errorResponse.data;
                deferred.reject(data);
                this.onGetResponse(blockUI);
            });
            return deferred.promise;
        }

        onSendRequest(showLoadingOverAll: boolean): void {
            if (showLoadingOverAll) {

                // show loading if request load more then 100 milliseconds
                this.$timeout(() => {
                    if (this.blockUIRequestsCount > 0) {
                        this.blockUI.start();
                    }
                }, 100);
                this.blockUIRequestsCount++;
            }
        }

        onGetResponse(showLoadingOverAll: boolean): void {
            if (showLoadingOverAll) {
                this.blockUIRequestsCount--;
                if (this.blockUIRequestsCount === 0) {
                    this.blockUI.reset();
                }
            }
        }
    }
    angular.module("app").service("httpHelper", HttpHelper);
}