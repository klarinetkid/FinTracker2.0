using FinTracker.Api.Common;
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
        private readonly TransactionService service = new();

        [HttpGet]
        public PaginatedResponse<TblTransaction> GetPaginatedTransactions([FromQuery] TransactionQuery? query)
        {
            return service.GetTransactions(query);
        }

        [HttpPost]
        public TblTransaction CreateCashTransaction(TransactionViewModel model)
        {
            return service.CreateCashTransaction(model);
        }

        [HttpPatch("{id?}")]
        public TblTransaction? PatchTransaction(int? id, TransactionViewModel model)
        {
            if (id == null) throw new Exception("Id cannot be null");
            return service.PatchTransaction(id.Value, model);
        }

        [HttpDelete("{id?}")]
        public IActionResult Delete(int? id)
        {
            if (id == null) throw new Exception();
            service.DeleteTransaction(id.Value);
            return Ok();
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
