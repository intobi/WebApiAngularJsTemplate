using System.Collections;
using System.Globalization;
using System.Web.Http;
using Newtonsoft.Json.Linq;
using WebApiAngularJsTemplate.Resources.Resources;

namespace WebApiAngularJsTemplate.Web.Controllers
{
    public class TranslationController : BaseApiController
    {
        [Route("api/translation")]
        [HttpGet]
        public IHttpActionResult GetAllTranslations(string lang)
        {
            var resourceObject = new JObject();

            var resourceSet = Resource.ResourceManager.GetResourceSet(new CultureInfo(lang), true, true);
            IDictionaryEnumerator enumerator = resourceSet.GetEnumerator();
            while (enumerator.MoveNext())
            {
                resourceObject.Add(enumerator.Key.ToString(), enumerator.Value.ToString());
            }

            return Ok(resourceObject);
        }
    }
}
