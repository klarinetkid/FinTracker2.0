using FinTracker.Api.Models;
using FinTracker.Services.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace FinTracker.Api.Services
{
    public class DefaultCategorizationService : BaseService
    {
        public TblCategory? GetDefaultCategory(string memo)
        {
            return db.TblDefaultCategorizations
                .Where(e => e.Memo == memo)
                .Select(e => e.Category)
                .FirstOrDefault();
        }

        public int BatchPatch(DefaultCategorizationViewModel[] defaultCategorizations)
        {
            foreach (DefaultCategorizationViewModel categorization in defaultCategorizations)
            {
                if (categorization.Memo == null || categorization.CategoryId == null) continue;

                TblDefaultCategorization? existing = db.TblDefaultCategorizations
                    .FirstOrDefault(e => e.Memo == categorization.Memo);

                if (existing == null)
                {
                    db.TblDefaultCategorizations.Add(categorization.ToTblDefaultCategorization());
                }
                else if (existing.CategoryId != categorization.CategoryId.Value)
                {
                    existing.CategoryId = categorization.CategoryId.Value;
                    db.TblDefaultCategorizations.Update(existing);
                }
            }

            return db.SaveChanges();
        }
    }
}
