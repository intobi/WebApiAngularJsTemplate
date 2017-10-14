var app = angular.module("app",
    [
        "ngMaterial",
        "ngRoute",
        "pascalprecht.translate",
        "ui.bootstrap",
        "ngSanitize",
        "blockUI",
        "ngMessages",
        "ngAnimate",
        "ngFileUpload",
        "ngFileSaver",
        "angularMoment",
        "angular-growl",
        "ui.router",
        "angular-jwt",
        "ngStorage"
    ]);

app.run(["$rootScope", "$transitions", "authService", "$location", "$state", ($rootScope, $transitions, authService: Services.IAuthService, $location, $state) => {
}
]);

app.config(["$mdThemingProvider", $mdThemingProvider => {
    // Extend the red theme with a different color and make the contrast color black instead of white.
    // For example: raised button text will be black instead of white.
    //var neonRedMap = $mdThemingProvider.extendPalette('red', {
    //    '500': '#ff0000',
    //    'contrastDefaultColor': 'dark'
    //});

    //// Register the new color palette map with the name <code>neonRed</code>
    //$mdThemingProvider.definePalette('neonRed', neonRedMap);

    //// Use that theme for the primary intentions
    //$mdThemingProvider.theme('default')
    //    .primaryPalette('neonRed');
}]);

app.config(["blockUIConfig", blockUIConfig => {
    blockUIConfig.autoBlock = false;
    blockUIConfig.templateUrl = "www/app/templates/loading-template.html";
}]);

app.config(["$translateProvider", $translateProvider => {
    $translateProvider.useUrlLoader("/api/translation");
    $translateProvider.useSanitizeValueStrategy(null);
}]);

app.config(["$mdDateLocaleProvider", $mdDateLocaleProvider => {
    $mdDateLocaleProvider.parseDate = date => {
        var m = moment(date, "DD/MM/YYYY"/*, true*/);
        return m.isValid() ? m.toDate() : new Date(NaN);
    };
    $mdDateLocaleProvider.formatDate = date => {
        if (!isNaN(Date.parse(date)))
            return moment(date).format("DD/MM/YYYY");
        return date;
    };
}]);

app.config(["growlProvider", growlProvider => {
    growlProvider.globalPosition("top-center");
    growlProvider.globalTimeToLive(5000);
    growlProvider.onlyUniqueMessages(false);
    growlProvider.globalDisableCountDown(true);
}]);

app.config(["$httpProvider", $httpProvider => {
    $httpProvider.interceptors.push(["$q", "$injector", "$location", "$window", ($q, $injector, $location, $window) => {
        return {
            request: (config) => {
                var storageHelper: Services.IStorageHelper = $injector.get("storageHelper");
                if (storageHelper.token) {
                    config.headers.Authorization = `Bearer ${storageHelper.token}`;
                }
                return config;
            },

            response: result => { return result; },

            responseError: rejection => {
                var authService = $injector.get("authService");
                if (rejection.status === 401) {
                    //authService.logOut();
                    //const $state = $injector.get("$state");
                    const alertService: Services.IAlertService = $injector.get("alertService");
                    alertService.error("Cannot access.");
                    //$state.go("account.login", { referer: $location.url() });

                    //$window.location = `/account/login?referer=${$location.url()}`;
                }

                return $q.reject(rejection);
            }
        }
    }]);
}]);