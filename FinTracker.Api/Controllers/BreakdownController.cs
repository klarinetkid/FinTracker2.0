using FinTracker.Api.Models;
using FinTracker.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace FinTracker.Api.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class BreakdownController : Controller
    {
        private readonly BreakdownService service = new ();

        [HttpGet]
        public BreakdownViewModel GetBreakdown([FromQuery] BreakdownQuery query)
        {
            return service.GetBreakdown(query);
        }

        [HttpGet]
        public IEnumerable<BreakdownViewModel> GetMonthlyBreakdownsForYear(int? year)
        {
            if (year == null) throw new ArgumentNullException();

            return service.GetMonthlyBreakdownsForYear(year.Value);
        }
    }
}
