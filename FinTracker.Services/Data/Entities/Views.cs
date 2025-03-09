using System.ComponentModel.DataAnnotations.Schema;

namespace FinTracker.Services.Data.Entities
{
    [Table("VwCategoryReferenceCounts")]
    public class VwCategoryReferenceCounts
    {
        public int Id { get; set; }
        public required string CategoryName { get; set; }
        public required string Colour { get; set; }
        public int TransactionCount { get; set; }
        public int MemoCount { get; set; }
        public int BudgetCount { get; set; }
    }
}
