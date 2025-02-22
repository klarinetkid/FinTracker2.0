using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FinTracker.Services.Data.Entities
{
    [Table("TblCategory")]
    public class TblCategory
    {
        [Key]
        public int Id { get; set; }
        public string CategoryName { get; set; }
        public string Colour { get; set; }
    }

    [Table("TblBudgetItem")]
    public class TblBudgetItem
    {
        [Key]
        public int Id { get; set; }
        public int CategoryId { get; set; }
        public virtual TblCategory? Category { get; set; }
        public int Amount { get; set; }
        public DateOnly EffectiveDate { get; set; }
    }

    [Table("TblTransaction")]
    public class TblTransaction
    {
        [Key]
        public int Id { get; set; }
        public DateOnly Date { get; set; }
        public int Amount { get; set; }
        public string? Memo { get; set; }
        public int? CategoryId { get; set; }
        public virtual TblCategory? Category { get; set; }
        public bool IsCashTransaction { get; set; }
    }

    [Table("TblImportFormat")]
    public class TblImportFormat
    {
        [Key]
        public int Id { get; set; }
        public string ImportFormatName { get; set; }
        public string DateKey { get; set; }
        public string MemoFormat { get; set; }
        public string AmountKey { get; set; }
        public bool InvertAmounts { get; set; }
        public int HeaderLines { get; set; }
        public char Delimiter { get; set; }
        public string? Image { get; set; }
    }

    [Table("TblMemoCategorization")]
    public class TblMemo
    {
        [Key]
        public int Id { get; set; }
        public string Memo { get; set; }
        public int CategoryId { get; set; }
        public virtual TblCategory? Category { get; set; }
    }
}
