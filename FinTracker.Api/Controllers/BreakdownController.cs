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
        public BreakdownCollection GetWeeklyBreakdownsForYear(int? year)
        {
            if (year == null) throw new ArgumentNullException();

            return service.GetWeeklyBreakdownsForYear(year.Value);
        }

        [HttpGet("Monthly/{year?}")]
        public BreakdownCollection GetMonthlyBreakdownsForYear(int? year)
        {
            if (year == null) throw new ArgumentNullException();

            return service.GetMonthlyBreakdownsForYear(year.Value);
        }

        [HttpGet("Yearly")]
        public BreakdownCollection GetYearlyBreakdowns()
        {
            return service.GetYearlyBreakdowns();
        }
    }
}
