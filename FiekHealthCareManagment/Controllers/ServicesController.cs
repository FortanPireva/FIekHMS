using Microsoft.AspNetCore.Mvc;

namespace FiekHealthCareManagment.Controllers
{
    public class ServicesController : Controller
    {
        // GET
        public IActionResult Index()
        {
            return View();
        }
    }
}