using FinTracker.Api.Models;
using FinTracker.Services.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace FinTracker.Api.Services
{
    public class BudgetItemService : BaseService
    {
        //public BudgetItemGroupViewModel[] GetBudgetItemGroups()
        public IEnumerable<Grouping<TblCategory, TblBudgetItem>> GetBudgetItemGroups()
        {
            return db.TblBudgetItems
                .Include(b => b.Category)
                .GroupBy(b => b.Category)
                .AsEnumerable()
                .Where(g => g.Key != null)
                .Select(g => new Grouping<TblCategory, TblBudgetItem>(g.Key!, g.OrderByDescending(e => e.EffectiveDate)))
                .OrderBy(g => g.Group.CategoryName);
        }

        public TblBudgetItem CreateBudgetItem(BudgetViewModel model)
        {
            TblBudgetItem tblBudgetItem = model.ToTblBudgetItem();
            db.TblBudgetItems.Entry(tblBudgetItem).State = EntityState.Added;
            db.SaveChanges();
            return tblBudgetItem;
        }

        public TblBudgetItem PutBudgetItem(int budgetItemId, BudgetViewModel model)
        {
            TblBudgetItem budgetItem = model.ToTblBudgetItem(budgetItemId);
            db.TblBudgetItems.Entry(budgetItem).State = EntityState.Modified;
            db.SaveChanges();
            return budgetItem;
        }

        public void DeleteBudgetItem(int id)
        {
            TblBudgetItem? budgetItem = db.TblBudgetItems.Find(id);
            if (budgetItem != null)
            {
                db.TblBudgetItems.Entry(budgetItem).State = EntityState.Deleted;
                db.SaveChanges();
            }
        }
    }
}
