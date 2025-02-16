using FinTracker.Api.Models;
using FinTracker.Api.Services;
using FinTracker.Services.Data.Entities;
using Microsoft.AspNetCore.Mvc;

namespace FinTracker.Api.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class TransactionController : Controller
    {
        private readonly TransactionService service = new ();

        [HttpPatch]
        public TblTransaction? PatchTransaction(TransactionViewModel model)
        {
            return service.PatchTransaction(model);
        }
    }
}
