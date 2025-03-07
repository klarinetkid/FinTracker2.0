using FinTracker.Api.Models;
using FinTracker.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace FinTracker.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TrendsController : Controller
    {
        private readonly TrendService service = new();

        [HttpGet]
        public TrendLineCollection Get([FromQuery] TrendQuery query)
        {
            return service.GetTrends(query);
        }
    }
}
