using FinTracker.Services.Data.Entities;

namespace FinTracker.Api.Models
{
    public class MemoViewModel
    {
        public string? Memo { get; set; }
        public int? CategoryId { get; set; }

        public TblMemo ToTblMemo(int id = 0)
        {
            return new TblMemo()
            {
                Id = id,
                Memo = Memo,
                CategoryId = CategoryId.HasValue ? CategoryId.Value : 0, // TODO: should throw exception?
            };
        }
    }
}
