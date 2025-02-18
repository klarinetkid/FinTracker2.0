using FinTracker.Services.Data.Entities;

namespace FinTracker.Api.Models
{
    public class DefaultCategorizationViewModel
    {
        public string? Memo { get; set; }
        public int? CategoryId { get; set; }

        public TblDefaultCategorization ToTblDefaultCategorization(int id = 0)
        {
            return new TblDefaultCategorization()
            {
                Id = id,
                Memo = Memo,
                CategoryId = CategoryId.HasValue ? CategoryId.Value : 0, // TODO: should throw exception?
            };
        }
    }
}
