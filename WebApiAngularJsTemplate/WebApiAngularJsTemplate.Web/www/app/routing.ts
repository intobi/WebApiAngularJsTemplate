module Core.Configs {
    import IAuthService = Services.IAuthService;

    export class ProviderConfig {

        static $inject = ["$stateProvider", "$urlRouterProvider", "$locationProvider", "$urlMatcherFactoryProvider"];

        constructor($stateProvider,
            $urlRouterProvider,
            $locationProvider,
            $urlMatcherFactoryProvider) {

            $urlMatcherFactoryProvider.caseInsensitive(true);

            $stateProvider
                .state("auth", {
                    abstract: true, // this state can not be activated itself and must be a parent
                    template: "<ui-view/>", // needed in order to inject the children into the view
                    resolve: {
                        user: ["authService", "$q", "$state", "$location", (authService: IAuthService, $q, $state, $location) => {
                            var d = $q.defer();
                            if (authService.isAuthorized()) {
                                // I also provide the user for child controllers
                                d.resolve();
                            } else {
                                $state.go("account.login", { referer: $location.url() });
                                d.reject("Unauthorized");
                            }
                            return d.promise;
                        }]
                    }
                })
                .state("main",
                {
                    parent: 'auth',
                    url: "/",
                    templateUrl: "www/app/controllers/home/home.html",
                    resolve: {
                        loggedInAndHasPermission: this.loggedInAndHasPermission
                    }
                })
                .state("home",
                {
                    parent: "auth",
                    url: "/home",
                    templateUrl: "www/app/controllers/home/home.html",
                    resolve: {
                        loggedInAndHasPermission: this.loggedInAndHasPermission
                    }
                })
                .state("notFound",
                {
                    url: "NotFound",
                    templateUrl: "www/app/templates/notFound.html",
                    resolve: {
                        loggedInAndHasPermission: this.loggedInAndHasPermission
                    }
                })
                .state("account",
                {
                    abstract: true,
                    url: "/account"
                })
                .state("account.login",
                {
                    url: "/login?referer",
                    templateUrl: "www/app/controllers/account/login.html",
                    resolve: {
                        loggedInAndHasPermission: this.loggedInAndHasPermission
                    }
                });

            $urlRouterProvider.otherwise(routerProviderInjector => {
                routerProviderInjector.invoke(["$state", $state => {
                    $state.go("notFound", {}, { location: false });
                }]);
            });

            $locationProvider.html5Mode(true).hashPrefix("!");
        }

        loggedInAndHasPermission = ["$q", "$location", "$timeout", "$window", "authService", "$state",
            ($q, $location, $timeout, $window, authService, $state) => this.checkSecurity($timeout, $window, $q, $location.path(), authService).then(() => {
                return;
            }).catch(() => {
                $state.go("NotFound");
            })
        ];

        checkSecurity = ($timeout, $window, $q, route, authService) => {
            var deferred = $q.defer();
            var authData = authService.getAuthData();
            if (authData) {
                deferred.resolve();
            } else {
                $timeout(() => {
                    deferred.resolve();
                }, 300);
            }
            return deferred.promise;
        }
    }

    angular.module("app").config(ProviderConfig);
}
