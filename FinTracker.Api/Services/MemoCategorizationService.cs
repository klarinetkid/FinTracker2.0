using FinTracker.Api.Models;
using FinTracker.Services.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace FinTracker.Api.Services
{
    public class MemoCategorizationService : BaseService
    {
        public TblCategory? GetMemoCategory(string memo)
        {
            return db.TblMemoCategorizations
                .Where(e => e.Memo == memo)
                .Select(e => e.Category)
                .FirstOrDefault();
        }

        public int BatchPatch(MemoCategorizationViewModel[] memoCategorizations)
        {
            foreach (MemoCategorizationViewModel categorization in memoCategorizations)
            {
                if (categorization.Memo == null || categorization.CategoryId == null) continue;

                TblMemoCategorization? existing = db.TblMemoCategorizations
                    .FirstOrDefault(e => e.Memo == categorization.Memo);

                if (existing == null)
                {
                    db.TblMemoCategorizations.Add(categorization.ToTblMemoCategorization());
                }
                else if (existing.CategoryId != categorization.CategoryId.Value)
                {
                    existing.CategoryId = categorization.CategoryId.Value;
                    db.TblMemoCategorizations.Update(existing);
                }
            }

            return db.SaveChanges();
        }
    }
}
