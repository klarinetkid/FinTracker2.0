using FinTracker.Services.Data.Entities;

namespace FinTracker.Api.Models
{
    public class MemoCategorizationGroupViewModel
    {
        public TblCategory Category { get; set; }
        public TblMemoCategorization[] MemoCategorizations { get; set; }

        public MemoCategorizationGroupViewModel(TblCategory category, IEnumerable<TblMemoCategorization> categorizations)
        {
            Category = category;
            MemoCategorizations = categorizations.ToArray();
        }
    }
}
