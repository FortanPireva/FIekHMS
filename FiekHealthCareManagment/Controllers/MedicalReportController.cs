using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FiekHealthCareManagment.Controllers
{
    [Route("reports")]
    [ApiController]
    [Authorize]
    public class MedicalReportController : BaseController
    {
        [HttpGet]
        [Route("{patientId}")]
        public string GetReportsForPatient(string patientId)
        {
            return "Up and Running";
        }
    }
}