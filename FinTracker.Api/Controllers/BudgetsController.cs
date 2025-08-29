using FinTracker.Api.Models;
using FinTracker.Api.Services;
using FinTracker.Services.Data.Entities;
using Microsoft.AspNetCore.Mvc;

namespace FinTracker.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BudgetsController : Controller
    {
        private readonly BudgetService service = new ();

        [HttpGet("Grouped")]
        public Grouping<TblCategory, TblBudget>[] Grouped()
        {
            return service.GetBudgetItemGroups().ToArray();
        }

        [HttpPost]
        public TblBudget Create(BudgetViewModel model)
        {
            return service.CreateBudgetItem(model);
        }

        [HttpPut("{id}")]
        public TblBudget? Patch(int id, BudgetViewModel model)
        {
            return service.PutBudgetItem(id, model);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            service.DeleteBudgetItem(id);
            return Ok();
        }
    }
}
