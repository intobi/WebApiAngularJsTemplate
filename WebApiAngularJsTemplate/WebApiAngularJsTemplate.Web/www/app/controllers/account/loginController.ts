module Controllers {
    import ILoginModel = DR.Interfaces.AccountModels.ILoginModel;
    import IAlertService = Services.IAlertService;


    export class LoginController {
        static $inject = ["$scope", "$stateParams", "$location", "$window", "$translate", "authService", "$state", "alertService"];

        minlength: number;
        loginData: ILoginModel;

        constructor(
            private readonly $scope,
            private readonly $stateParams,
            private readonly $location,
            private readonly $window,
            private readonly $translate,
            private readonly authService,
            private readonly $state,
            private readonly alertService: IAlertService) {

            this.minlength = 6;
            this.loginData = {
                userName: "",
                password: ""
            };
        }

        //initializeController = () => {
        //    var authData = this.authService.getAuthData();
        //    if (authData && authData.user_id) {
        //        this.redirectByRole();
        //    } else {
        //        this.$scope.loaded = true;
        //    }
        //}

        login = () => {
            this.authService.login(this.loginData)
                .then(() => {
                    if (this.$stateParams.referer) {
                        this.$location.url(this.$stateParams.referer);
                    } else {
                        this.$state.go("home");
                    }
                })
                .catch((err) => {
                    this.alertService.error(err);
                });
        }
    }

    angular.module("app").controller("LoginController", LoginController as any);
}