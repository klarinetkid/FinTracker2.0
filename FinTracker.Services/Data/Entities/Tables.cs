using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinTracker.Services.Data.Entities
{
    [Table("TblCategory")]
    public class TblCategory
    {
        [Key]
        public int Id { get; set; }
        public string? CategoryName { get; set; }
        public string? Colour { get; set; }
    }

    [Table("TblBudgetItem")]
    public class TblBudgetItem
    {
        [Key]
        public int Id { get; set; }
        public int? CategoryId { get; set; }
        public virtual TblCategory? Category { get; set; }
        public int? Amount { get; set; }
        public DateTime? EffectiveDate { get; set; }
        public bool? IsYearly { get; set; }
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
    }

    [Table("TblImportFileFormat")]
    public class TblImportFileFormat
    {
        [Key]
        public int Id { get; set; }
        public string ImportFileFormatName { get; set; }
        public string DateKey { get; set; }
        public string MemoFormat { get; set; }
        public string AmountKey { get; set; }
        public bool InvertAmounts { get; set; }
        public int? HeaderLines { get; set; }
        //public char Delimiter { get; set; }
    }

    [Table("TblDefaultCategorization")]
    public class TblDefaultCategorization
    {
        [Key]
        public int Id { get; set; }
        public string? Memo { get; set; }
        public int? CategoryId { get; set; }
        public virtual TblCategory? Category { get; set; }
    }
}
