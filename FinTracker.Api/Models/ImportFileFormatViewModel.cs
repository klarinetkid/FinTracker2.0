using FinTracker.Services.Data.Entities;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace FinTracker.Api.Models
{
    public class ImportFileFormatViewModel
    {
        public string? ImportFileFormatName { get; set; }
        public string? DateKey { get; set; }
        public string? MemoFormat { get; set; }
        public string? AmountKey { get; set; }
        public bool? InvertAmounts { get; set; }
        public int? HeaderLines { get; set; }
        public char? Delimiter { get; set; }
        public string? Image { get; set; }

        public TblImportFileFormat ToTblImportFileFormat(int id = 0)
        {
            return new TblImportFileFormat()
            {
                Id = id,
                ImportFileFormatName = ImportFileFormatName,
                DateKey = DateKey,
                MemoFormat = MemoFormat,
                AmountKey = AmountKey,
                InvertAmounts = InvertAmounts.HasValue ? InvertAmounts.Value : false,
                HeaderLines = HeaderLines.HasValue ? HeaderLines.Value : 0,
                Delimiter = Delimiter.HasValue ? Delimiter.Value : ',',
                Image = Image
            };
        }
    }
}
