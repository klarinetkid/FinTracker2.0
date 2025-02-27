using FinTracker.Api.Common;
using FinTracker.Api.Validation;
using FinTracker.Services.Data.Entities;
using System.ComponentModel.DataAnnotations;

namespace FinTracker.Api.Models
{
    public class BudgetViewModel
    {
        [Required]
        [CategoryId]
        [Display(Name = "Category")]
        public int? CategoryId { get; set; }

        [Required]
        public int? Amount { get; set; }

        [Required]
        [DateOnly]
        [Display(Name = "Effective Date")]
        public string? EffectiveDate { get; set; }

        private DateOnly getEffectiveDate()
        {
            if (DateOnly.TryParse(EffectiveDate, out var date))
            {
                return date;
            }

            throw new ArgumentException();
        }

        public TblBudget ToTblBudget(int id = 0)
        {
            return new TblBudget()
            {
                Id = id,
                CategoryId = CategoryId.HasValue ? CategoryId.Value : throw new Exception("Category ID is required"),
                Amount = Amount.HasValue ? Amount.Value : throw new Exception("Amount is required"),
                EffectiveDate = getEffectiveDate()
            };
        }
    }
}
