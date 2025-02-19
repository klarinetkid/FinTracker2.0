using FinTracker.Services.Data.Entities;

namespace FinTracker.Api.Models
{
    public class MemoCategorizationViewModel
    {
        public string? Memo { get; set; }
        public int? CategoryId { get; set; }

        public TblMemoCategorization ToTblMemoCategorization(int id = 0)
        {
            return new TblMemoCategorization()
            {
                Id = id,
                Memo = Memo,
                CategoryId = CategoryId.HasValue ? CategoryId.Value : 0, // TODO: should throw exception?
            };
        }
    }
}
