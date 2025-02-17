using FinTracker.Api.Models;
using FinTracker.Api.Services;
using FinTracker.Services.Data.Entities;
using Microsoft.AspNetCore.Mvc;

namespace FinTracker.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BudgetItemsController : Controller
    {
        private readonly BudgetItemService service = new ();

        [HttpGet("Grouped")]
        public BudgetItemGroupViewModel[] Grouped()
        {
            return service.GetBudgetItemGroups();
        }

        [HttpPost]
        public TblBudgetItem Create(BudgetItemViewModel model)
        {
            return service.CreateBudgetItem(model);
        }

        [HttpPut("{id?}")]
        public TblBudgetItem? Patch(int? id, BudgetItemViewModel model)
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
