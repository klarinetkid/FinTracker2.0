using System.ComponentModel.DataAnnotations.Schema;

namespace FinTracker.Services.Data.Entities
{
    [Table("VwCategoryTransactionCount")]
    public class VwCategoryTransactionCount
    {
        public int Id { get; set; }
        public string CategoryName { get; set; }
        public string Colour { get; set; }
        public int TransactionCount { get; set; }
    }
}
