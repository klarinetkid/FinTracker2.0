using FinTracker.Services.Data.Entities;
using System.ComponentModel.DataAnnotations;

namespace FinTracker.Api.Models
{
    public class BudgetItemViewModel
    {
        public int? Id { get; set; }

        [Required]
        public int? CategoryId { get; set; }

        [Required]
        public int? Amount { get; set; }

        [Required]
        public DateOnly? EffectiveDate { get; set; }

        public TblBudgetItem ToTblBudgetItem()
        {
            return new TblBudgetItem()
            {
                Id = Id.HasValue ? Id.Value : 0,
                CategoryId = CategoryId.HasValue ? CategoryId.Value : throw new Exception("Category ID is required"),
                Amount = Amount.HasValue ? Amount.Value : throw new Exception("Amount is required"),
                EffectiveDate = EffectiveDate.HasValue ? EffectiveDate.Value : throw new Exception("Effective Date is required")
            };
        }
    }
}
