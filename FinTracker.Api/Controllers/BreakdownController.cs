using FinTracker.Api.Models;
using FinTracker.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace FinTracker.Api.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class BreakdownController : Controller
    {
        [HttpGet]
        public BreakdownViewModel GetBreakdown([FromQuery] BreakdownQuery query)
        {
            BreakdownService service = new BreakdownService();
            return service.GetBreakdown(query);
        }

        [HttpGet]
        public IEnumerable<BreakdownViewModel> GetMonthlyBreakdownsForYear(int? year)
        {
            if (year == null) throw new ArgumentNullException();

            BreakdownService service = new BreakdownService();
            return service.GetMonthlyBreakdownsForYear(year.Value);
        }
    }
}
