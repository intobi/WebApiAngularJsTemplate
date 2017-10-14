using System.Net.Http;
using System.Web.Http;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using WebApiAngularJsTemplate.Data;
using WebApiAngularJsTemplate.Web.Models;

namespace WebApiAngularJsTemplate.Web.Controllers
{
    public class BaseApiController : ApiController
    {

        private ModelFactory _modelFactory;
        private ApplicationUserManager _AppUserManager = null;
        private ApplicationRoleManager _AppRoleManager = null;

        protected IAuthenticationManager AuthenticationManager => Request.GetOwinContext().Authentication;

        protected ApplicationUserManager AppUserManager => _AppUserManager ?? Request.GetOwinContext().GetUserManager<ApplicationUserManager>();

        protected ApplicationRoleManager AppRoleManager => _AppRoleManager ?? Request.GetOwinContext().GetUserManager<ApplicationRoleManager>();

        protected ModelFactory TheModelFactory
        {
            get
            {
                if (_modelFactory == null)
                {
                    _modelFactory = new ModelFactory(this.Request, this.AppUserManager);
                }
                return _modelFactory;
            }
        }

        protected IHttpActionResult GetErrorResult(IdentityResult result)
        {
            if (result == null)
            {
                return InternalServerError();
            }

            if (!result.Succeeded)
            {
                if (result.Errors != null)
                {
                    foreach (string error in result.Errors)
                    {
                        ModelState.AddModelError("", error);
                    }
                }

                if (ModelState.IsValid)
                {
                    return BadRequest();
                }

                return BadRequest(ModelState);
            }

            return null;
        }
    }
}