using FinTracker.Api.Common;
using FinTracker.Api.Models;
using FinTracker.Api.Services;
using FinTracker.Services.Data.Entities;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

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
        public TblTransaction CreateTransaction(TransactionViewModel model)
        {
            return service.CreateTransaction(model);
        }

        [HttpPatch("{id}")]
        public TblTransaction? PatchTransaction(int id, TransactionViewModel model)
        {
            return service.PatchTransaction(id, model);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            service.DeleteTransaction(id);
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
