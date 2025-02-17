using System.ClientModel.Primitives;
using FinTracker.Api.Models;
using FinTracker.Api.Services;
using FinTracker.Services.Data.Entities;
using Microsoft.AspNetCore.Mvc;

namespace FinTracker.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CategoriesController : Controller
    {
        private readonly CategoryService service = new ();

        [HttpGet]
        public TblCategory[] List()
        {
            return service.GetCategories();
        }

        [HttpGet("WithCounts")]
        public VwCategoryTransactionCount[] ListWithCounts()
        {
            return service.GetCategoryTransactionCounts();
        }

        [HttpPost]
        public TblCategory Create(CategoryViewModel model)
        {
            return service.CreateCategory(model);
        }

        [HttpPut("{id?}")]
        public TblCategory? Put(int? id, CategoryViewModel model)
        {
            if (id == null) throw new Exception("Id is null");
            return service.PutCategory(id.Value, model);
        }

        [HttpDelete("{id?}")]
        public IActionResult Delete(int? id)
        {
            if (id == null) return BadRequest();
            service.DeleteCategory(id.Value);
            return Ok();
        }
    }
}
