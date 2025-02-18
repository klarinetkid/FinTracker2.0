using FinTracker.Api.Models;
using FinTracker.Api.Services;
using FinTracker.Services.Data.Entities;
using Microsoft.AspNetCore.Mvc;

namespace FinTracker.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TransactionsController : Controller
    {
        private readonly TransactionService service = new ();

        [HttpPatch("{id?}")]
        public TblTransaction? PatchTransaction(int? id, TransactionViewModel model)
        {
            if (id == null) throw new Exception("Id cannot be null");
            return service.PatchTransaction(id.Value, model);
        }

        [HttpPost("$batch")]
        public int BatchCreate(TransactionViewModel[] transactions)
        {
            return service.BatchCreate(transactions);
        }

        [HttpPost("PrepareImport")]
        public TransactionViewModel[] PrepareImport(TransactionViewModel[] transactions)
        {
            return service.PrepareImport(transactions);
        }
    }
}
