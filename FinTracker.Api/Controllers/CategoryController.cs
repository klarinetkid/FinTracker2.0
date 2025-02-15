using FinTracker.Api.Models;
using FinTracker.Services.Data.Entities;
using Microsoft.AspNetCore.Mvc;

namespace FinTracker.Api.Controllers
{
    [ApiController]
    //[Consumes("application/json")] // TODO: needs base controller with these attributes
    [Route("[controller]/[action]")]
    public class CategoryController : Controller
    {
        [HttpGet]
        public TblCategory[] List()
        {
            return new CategoryViewModel().GetCategories();
        }
    }
}
