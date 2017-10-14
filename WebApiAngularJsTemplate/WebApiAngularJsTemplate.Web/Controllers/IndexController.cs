using System.Web.Mvc;

namespace WebApiAngularJsTemplate.Web.Controllers
{
    public class IndexController : Controller
    {
        // GET: Index
        public ActionResult Index()
        {
            return View("Index");
        }
    }
}