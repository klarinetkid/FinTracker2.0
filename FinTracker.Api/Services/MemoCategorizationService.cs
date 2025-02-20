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

        public TblMemoCategorization CreateMemoCategorization(MemoCategorizationViewModel model)
        {
            TblMemoCategorization tblCategorization = model.ToTblMemoCategorization();
            db.TblMemoCategorizations.Entry(tblCategorization).State = EntityState.Added;
            db.SaveChanges();
            return tblCategorization;
        }

        public TblMemoCategorization? PatchMemoCategorization(int id, MemoCategorizationViewModel model)
        {
            TblMemoCategorization? tblCategorization = db.TblMemoCategorizations.Find(id);
            if (tblCategorization != null)
            {
                if (model.CategoryId == null) throw new ArgumentException();

                tblCategorization.CategoryId = model.CategoryId.Value;
                db.TblMemoCategorizations.Entry(tblCategorization).State = EntityState.Modified;
                db.SaveChanges();
            }

            return db.TblMemoCategorizations.Include(e => e.Category)
                .FirstOrDefault(e => e.Id == id);
        }

        public void DeleteMemoCategorization(int id)
        {
            TblMemoCategorization? categorization = db.TblMemoCategorizations.Find(id);
            if (categorization != null)
            {
                db.TblMemoCategorizations.Entry(categorization).State = EntityState.Deleted;
                db.SaveChanges();
            }
        }

        public MemoCategorizationGroupViewModel[] GetGrouped()
        {
            return db.TblMemoCategorizations
                .Include(e => e.Category)
                .AsEnumerable()
                .GroupBy(e => e.Category)
                .Where(g => g.Key != null)
                .Select(g => new MemoCategorizationGroupViewModel(g.Key!, g.OrderBy(e => e.Memo)))
                .OrderBy(g => g.Category.CategoryName)
                .ToArray();
        }

        public int BatchPatch(MemoCategorizationViewModel[] categorizations)
        {
            foreach (MemoCategorizationViewModel categorization in categorizations)
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
