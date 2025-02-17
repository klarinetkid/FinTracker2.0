using FinTracker.Services.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace FinTracker.Api.Models
{
    public class TransactionViewModel
    {
        public int? Id { get; set; }
        public DateOnly? Date { get; set; }
        public int? Amount { get; set; }
        public string? Memo { get; set; }
        public int? CategoryId { get; set; }
        public TblCategory? Category { get; set; }


        public bool? IsDefaultCategorized { get; set; }
        public bool? IsAlreadyImported { get; set; }

        public TblTransaction ToTblTransaction()
        {
            return new TblTransaction
            { 
                Id = Id.HasValue ? Id.Value : 0,
                Date = Date.HasValue ? Date.Value : DateOnly.MinValue,
                Memo = Memo,
                Amount = Amount.HasValue ? Amount.Value : 0,
                CategoryId = CategoryId
            };
        }
    }
}
