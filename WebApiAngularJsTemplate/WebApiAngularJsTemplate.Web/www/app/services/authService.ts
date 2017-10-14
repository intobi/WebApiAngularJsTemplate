module Services {
    import IHttpHelper = Helpers.IHttpHelper;
    import ILoginModel = DR.Interfaces.AccountModels.ILoginModel;

    export interface IAuthService {
        isAuthorized(): boolean;
        login(loginData: ILoginModel);
        forgotPassword(resetData: any);
        deleteAuthData();
        logOut();
        getAuthData(): IAuthData;
        updateAccessToken();
    }

    export class AuthService implements IAuthService {
        authentication: any = {};

        static $inject = ["$q", "alertService", "$window", "httpHelper", "$http", "jwtHelper", "storageHelper", "$state", "$location"];

        constructor(
            private readonly $q: ng.IQService,
            private readonly alertService: AlertService,
            private readonly $window: ng.IWindowService,
            private readonly httpHelper: IHttpHelper,
            private readonly $http: ng.IHttpService,
            private readonly jwtHelper: any,
            private readonly storageHelper: IStorageHelper,
            private readonly $state: ng.ui.IStateService,
            private readonly $location) {
        }      

        isAuthorized(): boolean {
            const authData = this.getAuthData();
            if (authData && authData.nameid) {
                return true;
            } else {
                return false;
            }
        }

        login(loginData: ILoginModel) {
            this.deleteAuthData();
            const data = `client_id=self&grant_type=password&username=${loginData.userName}&password=${encodeURIComponent(loginData.password)}`;
            var deferred = this.$q.defer();

            this.httpHelper.http(() => { return this.$http.post("api/token", data); }, true).then(
                response => {
                    this.storageHelper.tokenInLocal = response.access_token;
                    deferred.resolve(response.access_token);

                    this.storageHelper.userNameInLocal = loginData.userName;
                },
                err => {
                    this.deleteAuthData();
                    deferred.reject(err.error_description);
                });
            return deferred.promise;
        }

        forgotPassword(resetData) {
            this.deleteAuthData();

            var deferred = this.$q.defer();

            //this.ajaxService.ajaxPost({ Email: resetData },"api/accounts/Forgotpassword",
            //    response => {
            //        deferred.resolve(response);
            //    },
            //    response => {
            //        deferred.reject({ message: this.alertService.getMessageFromResponse(response) });
            //    });

            return deferred.promise;
        }

        deleteAuthData() {
            this.storageHelper.resetLocal();
            this.storageHelper.resetSession();
        }

        logOut() {
            var deferred = this.$q.defer();
            this.httpHelper.http(() => { return this.$http.get("api/accounts/LogOut"); }, true).then(
                () => {
                    this.deleteAuthData();
                    deferred.resolve();
                },
                () => {
                    this.deleteAuthData();
                    deferred.reject();
                });
            return deferred.promise;
        }

        getAuthData(): IAuthData {
            if (this.storageHelper.authData == null) {
                this.deleteAuthData();
                //this.logOut();
                return null;
            }

            return this.storageHelper.authData;
        }

        updateAccessToken() {
            var deferred = this.$q.defer();
            this.$http.get("api/account/UpdateLocalAccessToken"),
                (response) => {
                    if (this.storageHelper.tokenInLocal) {
                        this.storageHelper.tokenInLocal = response.access_token;
                    } else {
                        this.storageHelper.tokenInSession = response.access_token;
                    }
                    //this.authentication.isAuth = true;
                    //this.authentication.userName = response.UserName;
                    deferred.resolve(response);
                },
                (response) => {
                    this.deleteAuthData();
                    deferred.reject({ message: this.alertService.getMessageFromResponse(response) });
                };
            return deferred.promise;
        }
    }

    angular.module("app").service("authService", AuthService);
}