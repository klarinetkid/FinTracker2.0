using FinTracker.Api.Models;
using FinTracker.Api.Services;
using FinTracker.Services.Data.Entities;
using Microsoft.AspNetCore.Mvc;

namespace FinTracker.Api.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class CategoryController : Controller
    {
        private readonly CategoryService service = new ();

        [HttpGet]
        public TblCategory[] List()
        {
            return service.GetCategories();
        }

        [HttpGet]
        public VwCategoryTransactionCount[] CategoryTransactionCounts()
        {
            return service.GetCategoryTransactionCounts();
        }

        [HttpPost]
        public TblCategory Create(CategoryViewModel model)
        {
            return service.CreateCategory(model);
        }

        [HttpDelete]
        public IActionResult Delete([FromQuery]CategoryViewModel model)
        {
            service.DeleteCategory(model);
            return Ok();
        }
    }
}
