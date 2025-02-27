using FinTracker.Api.Models;
using FinTracker.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace FinTracker.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MetadataController : Controller
    {
        private readonly MetadataService service = new();

        [HttpGet("AvailableYears")]
        public IEnumerable<int> GetAvailableYears()
        {
            return service.GetAvailableYears();
        }

        [HttpGet("Counts")]
        public CountsViewModel GetCounts()
        {
            return service.GetCounts();
        }
    }
}
