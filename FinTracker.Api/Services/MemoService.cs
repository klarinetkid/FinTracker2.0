using FinTracker.Api.Common;
using FinTracker.Api.Models;
using FinTracker.Services.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace FinTracker.Api.Services
{
    public class MemoService : BaseEntityService<TblMemo>
    {
        public TblMemo? GetMemo(string? memo)
        {
            if (memo == null) return null;

            return db.TblMemos
                .Where(e => e.Memo == memo)
                .Include(e => e.Category)
                .FirstOrDefault();
        }

        public TblMemo? PatchMemo(int id, MemoViewModel model)
        {
            TblMemo tblMemo = db.TblMemos.FindEntity(id);
            tblMemo.CategoryId = model.CategoryId ?? null;
            tblMemo.IsImported = model.IsImported ?? false;
            db.TblMemos.Entry(tblMemo).State = EntityState.Modified;
            db.SaveChanges();

            return db.TblMemos.Include(e => e.Category)
                .FirstOrDefault(e => e.Id == id);
        }

        public void DeleteMemo(int id) => deleteEntityAndSave(id);

        public IEnumerable<Grouping<TblCategory?, TblMemo>> GetGrouped()
        {
            return db.TblMemos
                .Include(e => e.Category)
                .GroupBy(e => e.IsImported)
                .AsEnumerable()
                .SelectMany(g => 
                    g.GroupBy(e => e.Category).Select(e => 
                        new Grouping<TblCategory?, TblMemo>(e.Key!, e.OrderBy(e => e.Memo))
                    )
                )
                .OrderBy(g => g.Group == null)
                .ThenBy(g => g.Group != null ? g.Group.CategoryName : "");
        }

        public int BatchPatch(MemoViewModel[] memos)
        {
            int numPatched = 0;
            foreach (MemoViewModel memo in memos)
            {
                if (memo.Memo == null) continue;

                TblMemo? existing = db.TblMemos
                    .FirstOrDefault(e => e.Memo == memo.Memo);

                if (existing == null)
                {
                    db.TblMemos.Add(memo.ToTblEntity());
                }
                else
                {
                    PatchMemo(existing.Id, memo);
                    numPatched++;
                }
            }

            return db.SaveChanges() + numPatched;
        }
    }
}
