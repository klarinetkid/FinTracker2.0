﻿using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FinTracker.Services.Data.Entities
{
    [Table("TblCategory")]
    public class TblCategory
    {
        [Key]
        public int Id { get; set; }
        public required string CategoryName { get; set; }
        public required string Colour { get; set; }
    }

    [Table("TblBudget")]
    public class TblBudget
    {
        [Key]
        public int Id { get; set; }
        public required int CategoryId { get; set; }
        public virtual TblCategory? Category { get; set; }
        public required int Amount { get; set; }
        public required DateOnly EffectiveDate { get; set; }
    }

    [Table("TblTransaction")]
    public class TblTransaction
    {
        [Key]
        public int Id { get; set; }
        public required DateOnly Date { get; set; }
        public required int Amount { get; set; }
        public required string Memo { get; set; }
        public int? CategoryId { get; set; }
        public virtual TblCategory? Category { get; set; }
        public bool IsCashTransaction { get; set; } = false;
    }

    [Table("TblImportFormat")]
    public class TblImportFormat
    {
        [Key]
        public int Id { get; set; }
        public required string ImportFormatName { get; set; }
        public required string DateKey { get; set; }
        public required string MemoFormat { get; set; }
        public required string AmountKey { get; set; }
        public required bool InvertAmounts { get; set; }
        public required int HeaderLines { get; set; }
        public required char Delimiter { get; set; }
        public string? Image { get; set; }
    }

    [Table("TblMemo")]
    public class TblMemo
    {
        [Key]
        public int Id { get; set; }
        public required string Memo { get; set; }
        public int? CategoryId { get; set; }
        public virtual TblCategory? Category { get; set; }
        public bool IsImported { get; set; } = true;
    }
}
