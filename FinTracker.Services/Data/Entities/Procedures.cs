using System.ComponentModel.DataAnnotations.Schema;

namespace FinTracker.Services.Data.Entities
{
    public class CategoryTotal
    {
        public int? CategoryId { get; set; }
        
        [NotMapped]
        public TblCategory? Category { get; set; }

        public int Total { get; set; }

        public double? PercentOfIncome { get; set; }
        public double? PercentOfSpend { get; set; }
        
        public int? Budget { get; set; }
        public int? BudgetDeviation { get; set; }
    }
}
