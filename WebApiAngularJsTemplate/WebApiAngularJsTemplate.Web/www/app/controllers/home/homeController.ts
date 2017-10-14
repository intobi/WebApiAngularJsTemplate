module Controllers {
    import AuthService = Services.IAuthService;

    export class HomeController {
        static $inject = ["$scope", "authService",  "$stateParams", "$location", "$state"];

        loaded: boolean;

        constructor(
            private readonly $scope,
            private readonly authService: AuthService,
            private readonly $stateParams,
            private readonly $location,
            private readonly $state: ng.ui.IStateService) {

        }
    }

    angular.module("app").controller("homeController", HomeController as any);
}