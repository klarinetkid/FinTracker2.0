using FinTracker.Services.Data.Entities;
using System.ComponentModel.DataAnnotations;

namespace FinTracker.Api.Models
{
    public class TransactionViewModel : IEntityViewModel<TblTransaction>
    {
        [Required]
        public DateOnly? Date { get; set; }
        [Required]
        public int? Amount { get; set; }
        [Required]
        public string? Memo { get; set; }
        public int? CategoryId { get; set; }
        public TblCategory? Category { get; set; }
        public bool? IsCashTransaction { get; set; }

        public bool? IsAlreadyImported { get; set; }
        public TblMemo? SavedMemo { get; set; }


        public TblTransaction ToTblEntity(int id = 0)
        {
            return new TblTransaction
            {
                Id = id,
                Date = Date.HasValue ? Date.Value : throw new Exception("Date is required"),
                Memo = Memo ?? throw new Exception("Memo is required"),
                Amount = Amount.HasValue ? Amount.Value : throw new Exception("Amount is required"),
                CategoryId = CategoryId,
                IsCashTransaction = IsCashTransaction.HasValue ? IsCashTransaction.Value : false,
            };
        }
    }
}
