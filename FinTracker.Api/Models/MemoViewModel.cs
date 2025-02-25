using FinTracker.Services.Data.Entities;
using System.ComponentModel.DataAnnotations;

namespace FinTracker.Api.Models
{
    public class MemoViewModel
    {
        [Required]
        [MaxLength(200)]
        public string? Memo { get; set; }
        public int? CategoryId { get; set; }
        public bool? IsImported { get; set; }

        public TblMemo ToTblMemo(int id = 0)
        {
            return new TblMemo()
            {
                Id = id,
                Memo = Memo ?? throw new Exception("Memo is required"),
                CategoryId = CategoryId,
                IsImported = IsImported.HasValue ? IsImported.Value : true
            };
        }
    }
}
