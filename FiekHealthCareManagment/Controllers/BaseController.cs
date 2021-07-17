using Microsoft.AspNetCore.Mvc;

namespace FiekHealthCareManagment.Controllers
{
    public class BaseController : ControllerBase
    {
        // GET
        [HttpGet]
        public JsonResult Index()
        {
            return new JsonResult("Server is up and running");
        }
    }
}