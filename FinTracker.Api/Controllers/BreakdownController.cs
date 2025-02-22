using FinTracker.Api.Models;
using FinTracker.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace FinTracker.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BreakdownController : Controller
    {
        private readonly BreakdownService service = new ();

        [HttpGet]
        public BreakdownViewModel GetBreakdown([FromQuery] BreakdownQuery query)
        {
            return service.GetBreakdown(query);
        }

        [HttpGet("Weekly/{year?}")]
        public IEnumerable<BreakdownViewModel> GetWeeklyBreakdownsForYear(int? year)
        {
            if (year == null) throw new ArgumentNullException();

            return service.GetWeeklyBreakdownsForYear(year.Value);
        }

        [HttpGet("Monthly/{year?}")]
        public IEnumerable<BreakdownViewModel> GetMonthlyBreakdownsForYear(int? year)
        {
            if (year == null) throw new ArgumentNullException();

            return service.GetMonthlyBreakdownsForYear(year.Value);
        }

        [HttpGet("Yearly")]
        public IEnumerable<BreakdownViewModel> GetYearlyBreakdowns()
        {
            return service.GetYearlyBreakdowns();
        }
    }
}
