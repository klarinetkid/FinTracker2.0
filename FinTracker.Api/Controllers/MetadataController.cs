using FinTracker.Api.Models;
using FinTracker.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace FinTracker.Api.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class MetadataController : Controller
    {
        private readonly MetadataService service = new();

        [HttpGet]
        public IEnumerable<int> AvailableYears()
        {
            return service.GetAvailableYears();
        }
    }
}
