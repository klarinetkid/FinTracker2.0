using FinTracker.Api.Common;
using FinTracker.Services.Data.Entities;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace FinTracker.Api.Models
{
    public class ImportFormatViewModel
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

        public TblImportFormat ToTblImportFormat(int id = 0)
        {
            return new TblImportFormat()
            {
                Id = id,
                ImportFormatName = ImportFormatName,
                DateKey = DateKey,
                MemoFormat = MemoFormat,
                AmountKey = AmountKey,
                InvertAmounts = InvertAmounts.HasValue ? InvertAmounts.Value : false,
                HeaderLines = HeaderLines.HasValue ? HeaderLines.Value : 0,
                Delimiter = Delimiter[0],
                Image = Image
            };
        }
    }
}
