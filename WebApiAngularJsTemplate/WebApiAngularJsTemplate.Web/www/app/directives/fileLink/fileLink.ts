module DR.Directives {
    import ConstantService = Services.IConstantService;

    export interface IFileLink extends ng.IScope {
        url: string;
    }

    class FileLink implements ng.IDirective {

        constructor(private constantService: ConstantService) {
        }

        link(scope: IFileLink): void {
            scope.url = this.constantService.fileGetUrl;
        };

        static factory(): ng.IDirectiveFactory {
            const directive: ng.IDirectiveFactory = (constantService) => {
                var fileLinkDirective = new FileLink(constantService);
                return {
                    restrict: "E",
                    scope: {
                        link: "@",
                        linkName: "@"
                    },
                    templateUrl: "www/app/directives/fileLink/fileLink.html",
                    link: (scope: any) => {
                        fileLinkDirective.link(scope);
                    }
                };
            };
            directive.$inject = ["constantService"];
            return directive;
        }
    }

    angular.module("app").directive("fileLink", FileLink.factory());
}