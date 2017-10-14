using System.Web.Mvc;
using System.Web.Routing;

namespace WebApiAngularJsTemplate.Web
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            routes.MapRoute(
                name: "Default",
                url: "{*.}",
                defaults: new { controller = "Index", action = "Index" }
            );
        }
    }
}

