module DR.Directives {
    import ConstantService = Services.IConstantService;

    export interface IFile {
        //id: number;
        path: string;
        name: string;
        isNew: boolean;
        link: string;
    }

    export interface IFilesInputScope extends ng.IScope {
        files: IFile[];
        deleteFile(index);
        deleteNewFile(index);
        addFile();
        newFiles: any[];
        deleteFilesLinks: string[];
        getNewFiles();
        getFilesUrl: string;
        clearNewFiles();
        allowMultipleFiles: boolean;
        buttonText: string;
        allowTypes: string[];
    }

    class FilesInput implements ng.IDirective {

        constructor(private $rootScope, private $timeout: ng.ITimeoutService, private constantService: ConstantService) {
        }

        link(scope: IFilesInputScope, element: ng.IAugmentedJQuery): void {
            scope.newFiles = [];
            scope.deleteFilesLinks = [];
            scope.buttonText = "Attach a new file";

            scope.getFilesUrl = this.constantService.fileGetUrl;

            if (scope.allowMultipleFiles == null) {
                scope.allowMultipleFiles = true;
            }
            
            const input = $(element[0].querySelector("#fileInput"));
            if (scope.allowMultipleFiles) {
                input.attr("multiple", "");
            }

            if (scope.allowTypes && scope.allowTypes.length > 0) {
                let acceptValue = "";
                Enumerable.from(scope.allowTypes).forEach(x => acceptValue += x + ", ");
                input.attr("accept", acceptValue);
            }
            
            scope.addFile = () => {
                input.click();
            }

            scope.clearNewFiles = () => {
                input.val("");
                scope.newFiles = [];
            }

            scope.deleteFile = (index) => {
                var currentFile = scope.files[index];
                scope.deleteFilesLinks.push(currentFile.link);
                scope.files.splice(index, 1);
            }

            scope.deleteNewFile = (index) => {
                scope.newFiles.splice(index, 1);
            }

            input.on("change", (e: any) => {
                var files = e.target.files;
                if (scope.allowMultipleFiles === false && scope.newFiles.length > 0) {
                    scope.newFiles = [];
                }
                if (files != null && files.length > 0) {
                    angular.forEach(files, (file, key) => {
                        scope.newFiles.push(file);
                        this.$timeout(() => {
                        });
                    });
                }
                input.val("");
            });
        }

        static factory(): ng.IDirectiveFactory {
            const directive: ng.IDirectiveFactory = ($rootScope, $timeout, constantService) => {
                var filesInputDirective = new FilesInput($rootScope, $timeout, constantService);
                return {
                    restrict: "E",
                    templateUrl: "www/app/directives/filesInput/filesInput.html",
                    scope: {
                        files: "=?",
                        newFiles: "=",
                        deleteFilesLinks: "=?",
                        clearNewFiles: "=?",
                        allowMultipleFiles: "=?",
                        buttonText: "@?",
                        allowTypes: "=?"
                    },
                    link: (scope: any, element: ng.IAugmentedJQuery) => {
                        filesInputDirective.link(scope, element);
                    }
                };
            };
            directive.$inject = ["$rootScope", "$timeout", "constantService"];
            return directive;
        }
    }
    angular.module("app").directive("filesInput", FilesInput.factory());
}

