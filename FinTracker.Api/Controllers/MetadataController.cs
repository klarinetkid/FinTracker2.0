using FinTracker.Api.Models;
using Microsoft.AspNetCore.Mvc;

namespace FinTracker.Api.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class MetadataController : Controller
    {
        [HttpGet]
        public IEnumerable<int> AvailableYears()
        {
            return new MetadataViewModel().GetAvailableYears();
        }
    }
}
