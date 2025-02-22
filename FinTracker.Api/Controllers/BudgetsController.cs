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
        private readonly BudgetItemService service = new ();

        [HttpGet("Grouped")]
        //public BudgetItemGroupViewModel[] Grouped()
        public Grouping<TblCategory, TblBudgetItem>[] Grouped()
        {
            return service.GetBudgetItemGroups().ToArray();
        }

        [HttpPost]
        public TblBudgetItem Create(BudgetViewModel model)
        {
            return service.CreateBudgetItem(model);
        }

        [HttpPut("{id?}")]
        public TblBudgetItem? Patch(int? id, BudgetViewModel model)
        {
            if (id == null) throw new Exception("Id is null");
            return service.PutBudgetItem(id.Value, model);
        }

        [HttpDelete("{id?}")]
        public IActionResult Delete(int? id)
        {
            if (id == null) return BadRequest();
            service.DeleteBudgetItem(id.Value);
            return Ok();
        }
    }
}
