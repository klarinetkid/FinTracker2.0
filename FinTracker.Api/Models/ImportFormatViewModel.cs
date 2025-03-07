using FinTracker.Api.Common;
using FinTracker.Services.Data.Entities;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace FinTracker.Api.Models
{
    public class ImportFormatViewModel : IEntityViewModel<TblImportFormat>
    {
        [Required]
        [MaxLength(50, ErrorMessage = Strings.ErrorMaxLength)]
        [Display(Name = "Import Format Name")]
        public string? ImportFormatName { get; set; }

        [Required]
        [MaxLength(25, ErrorMessage = Strings.ErrorMaxLength)]
        [Display(Name = "Date Key")]
        public string? DateKey { get; set; }

        [Required]
        [MaxLength(50, ErrorMessage = Strings.ErrorMaxLength)]
        [Display(Name = "Memo Format")]
        public string? MemoFormat { get; set; }

        [Required]
        [MaxLength(25, ErrorMessage = Strings.ErrorMaxLength)]
        [Display(Name = "Amount Key")]
        public string? AmountKey { get; set; }

        [Required]
        [Display(Name = "Invert Amounts")]
        public bool? InvertAmounts { get; set; }

        [Required]
        [Display(Name = "Header Lines")]
        public int? HeaderLines { get; set; }

        [Required]
        [MaxLength(1, ErrorMessage = Strings.ErrorSingleCharacter)]
        public string? Delimiter { get; set; }

        [MaxLength(25, ErrorMessage = Strings.ErrorMaxLength)]
        public string? Image { get; set; }

        public TblImportFormat ToTblEntity(int id = 0)
        {
            return new TblImportFormat()
            {
                Id = id,
                ImportFormatName = ImportFormatName ?? throw new Exception("ImportFormatName is required"),
                DateKey = DateKey ?? throw new Exception("DateKey is required"),
                MemoFormat = MemoFormat ?? throw new Exception("MemoFormat is required"),
                AmountKey = AmountKey ?? throw new Exception("AmountKey is required"),
                InvertAmounts = InvertAmounts.HasValue ? InvertAmounts.Value : throw new Exception("InvertAmounts is required"),
                HeaderLines = HeaderLines.HasValue ? HeaderLines.Value : throw new Exception("HeaderLines is required"),
                Delimiter = Delimiter != null ? Delimiter[0] : throw new Exception("Delimiter is required"),
                Image = Image
            };
        }
    }
}
