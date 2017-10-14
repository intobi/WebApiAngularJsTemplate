using System.Web.Optimization;

namespace WebApiAngularJsTemplate.Web
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                "~/Assets/lib/jquery/dist/jquery.js"));

            bundles.Add(new StyleBundle("~/Assets/styles/css").Include(
                "~/Assets/lib/angular-block-ui/dist/angular-block-ui.css",
                "~/Assets/lib/angular-material/angular-material.min.css",
                "~/Assets/lib/angular-material/layouts/angular-material.layouts.min.css",
                "~/Assets/lib/angular-growl-2/build/angular-growl.min.css",
                "~/Assets/lib/bootstrap/dist/css/bootstrap.min.css",
                "~/Content/styles/main.css"));

            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
               "~/Assets/lib/angular/angular.js",
               "~/Assets/lib/moment/moment.js",
               "~/Assets/lib/angular-block-ui/dist/angular-ui.js",
               "~/Assets/lib/angular-block-ui/dist/angular-block-ui.js",
               "~/Assets/lib/angular-messages/angular-messages.js",
               "~/Assets/lib/angular-bootstrap/ui-bootstrap.js",
               "~/Assets/lib/angular-bootstrap/ui-bootstrap-tpls.js",
               "~/Assets/lib/angular-cookies/angular-cookies.js",
               "~/Assets/lib/angular-translate/angular-translate.js",
               "~/Assets/lib/angular-translate-loader-url/angular-translate-loader-url.js",
               "~/Assets/lib/angular-route/angular-route.js",
               "~/Assets/lib/angular-animate/angular-animate.js",
               "~/Assets/lib/angular-aria/angular-aria.js",
               "~/Assets/lib/angular-material/angular-material.min.js",
               "~/Assets/lib/angular-sanitize/angular-sanitize.js",
               "~/Assets/lib/angular-moment/angular-moment.js",
               "~/Assets/lib/angular-file-upload/dist/angular-file-upload.js",
               "~/Assets/lib/ng-file-upload/ng-file-upload.js",
               "~/Assets/lib/ng-file-upload/ng-file-upload-shim.js",
               "~/Assets/lib/angular-file-saver/dist/angular-file-saver.bundle.js",
               "~/Assets/lib/angular-growl-2/build/angular-growl.min.js",
               "~/Assets/lib/angular-ui-router/release/angular-ui-router.min.js",
                "~/Assets/lib/angular-jwt/dist/angular-jwt.min.js",
                "~/Assets/lib/ngstorage/ngStorage.min.js",
                "~/Assets/lib/linqjs/linq.min.js"
               ));

            bundles.Add(new ScriptBundle("~/bundles/main").Include(
                "~/www/app/app.js",
                "~/www/app/routing.js"));

            bundles.Add(new ScriptBundle("~/bundles/directives").IncludeDirectory("~/www/app/directives", "*.js", true));

            bundles.Add(new ScriptBundle("~/bundles/services").IncludeDirectory("~/www/app/services", "*.js", true));

            bundles.Add(new ScriptBundle("~/bundles/shared").IncludeDirectory("~/Views/Shared", "*.js", true));

            bundles.Add(new ScriptBundle("~/bundles/controllers").IncludeDirectory("~/www/app/controllers", "*.js", true));

            bundles.Add(new ScriptBundle("~/bundles/enums").Include("~/www/app/common/enums.js"));
            //BundleTable.EnableOptimizations = false;
        }
    }
}