using FinTracker.Api.Models;
using FinTracker.Services.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace FinTracker.Api.Services
{
    public class BudgetItemService : BaseService
    {
        public BudgetItemGroupViewModel[] GetBudgetItemGroups()
        {
            return db.TblBudgetItems
                .Include(b => b.Category)
                .GroupBy(b => b.Category)
                .AsEnumerable()
                .Select(g => new BudgetItemGroupViewModel(g.Key, g.OrderByDescending(e => e.EffectiveDate)))
                .OrderBy(g => g.Category.CategoryName)
                .ToArray();
        }

        public TblBudgetItem CreateBudgetItem(BudgetItemViewModel model)
        {
            TblBudgetItem tblBudgetItem = model.ToTblBudgetItem();
            db.TblBudgetItems.Entry(tblBudgetItem).State = EntityState.Added;
            db.SaveChanges();
            return tblBudgetItem;
        }

        public TblBudgetItem PutBudgetItem(int budgetItemId, BudgetItemViewModel model)
        {
            TblBudgetItem budgetItem = model.ToTblBudgetItem();
            budgetItem.Id = budgetItemId;

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
