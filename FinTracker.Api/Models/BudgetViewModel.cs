using FinTracker.Services.Data.Entities;
using System.ComponentModel.DataAnnotations;

namespace FinTracker.Api.Models
{
    public class BudgetViewModel
    {
        [Required]
        [Display(Name = "Category")]
        public int? CategoryId { get; set; }

        [Required]
        public int? Amount { get; set; }

        [Required]
        [Display(Name = "Effective Date")]
        public DateOnly? EffectiveDate { get; set; }

        public TblBudget ToTblBudget(int id = 0)
        {
            return new TblBudget()
            {
                Id = id,
                CategoryId = CategoryId.HasValue ? CategoryId.Value : throw new Exception("CategoryId is required"),
                Amount = Amount.HasValue ? Amount.Value : throw new Exception("Amount is required"),
                EffectiveDate = EffectiveDate.HasValue ? EffectiveDate.Value : throw new Exception("EffectiveDate is required"),
            };
        }
    }
}
