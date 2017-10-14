module Controllers {
    import IHttpHelper = Helpers.IHttpHelper;
    import IAuthService = Services.IAuthService;
    import IAuthData = Services.IAuthData;

    export class MasterController {
        menuItems: any;
        isAuth: boolean;
        roleId: string;
        applicationVersion: any;


        static $inject = ["$scope", "$translate", "$stateParams", "$location", "$window", "$injector", "authService", "$state", "$rootScope", "httpHelper", "$http"];
        constructor(
            private readonly $scope,
            private readonly $translate,
            private readonly $stateParams,
            private readonly $location,
            private readonly $window,
            private readonly $injector,
            public  readonly authService: IAuthService,
            private readonly $state,
            private readonly $rootScope,
            private readonly httpHelper: IHttpHelper,
            private readonly $http
        ) { 
            $rootScope.enums = { };
            this.httpHelper.http(() => { return this.$http.get("api/accounts/users"); }, true)
            $scope.setLanguage = this.setLanguage;
            const lang = "en";
            this.setLanguage(lang);
        }

        setLanguage = (lang) => {
            this.$translate.use(lang);
        }

        logOut = () => {
            this.authService.logOut().then(() => {
                this.$state.go("account.login");
            }).catch(() => {
                this.$state.go("account.login");
            });
        }
    }

    angular.module("app").controller("masterController", MasterController as any);
}