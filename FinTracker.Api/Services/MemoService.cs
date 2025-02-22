using FinTracker.Api.Models;
using FinTracker.Services.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace FinTracker.Api.Services
{
    public class MemoService : BaseService
    {
        public TblMemo? GetMemo(string? memo)
        {
            if (memo == null) return null;

            return db.TblMemos
                .Where(e => e.Memo == memo)
                .Include(e => e.Category)
                .FirstOrDefault();
        }

        public TblMemo CreateMemo(MemoViewModel model)
        {
            TblMemo tblCategorization = model.ToTblMemo();
            db.TblMemos.Entry(tblCategorization).State = EntityState.Added;
            db.SaveChanges();
            return tblCategorization;
        }

        public TblMemo? PatchMemo(int id, MemoViewModel model)
        {
            TblMemo? tblMemo = db.TblMemos.Find(id);
            if (tblMemo != null)
            {
                tblMemo.CategoryId = model.CategoryId ?? null;
                tblMemo.IsImported = model.IsImported ?? false;
                db.TblMemos.Entry(tblMemo).State = EntityState.Modified;
                db.SaveChanges();
            }

            return db.TblMemos.Include(e => e.Category)
                .FirstOrDefault(e => e.Id == id);
        }

        public void DeleteMemo(int id)
        {
            TblMemo? categorization = db.TblMemos.Find(id);
            if (categorization == null) throw new InvalidDataException();
            db.TblMemos.Entry(categorization).State = EntityState.Deleted;
            db.SaveChanges();
        }

        public IEnumerable<Grouping<TblCategory, TblMemo>> GetGrouped()
        {
            return db.TblMemos
                .Include(e => e.Category)
                .AsEnumerable()
                .GroupBy(e => e.Category)
                .Where(e => e.Key != null)
                .Select(e => new Grouping<TblCategory, TblMemo>(e.Key!, e.OrderBy(e => e.Memo)));
        }

        public int BatchPatch(MemoViewModel[] memos)
        {
            foreach (MemoViewModel memo in memos)
            {
                if (memo.Memo == null) continue;

                TblMemo? existing = db.TblMemos
                    .FirstOrDefault(e => e.Memo == memo.Memo);

                if (existing == null)
                {
                    db.TblMemos.Add(memo.ToTblMemo());
                }
                else
                {
                    PatchMemo(existing.Id, memo);
                }
            }

            return db.SaveChanges();
        }
    }
}
