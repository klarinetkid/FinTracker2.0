using FinTracker.Api.Common;
using FinTracker.Api.Models;
using FinTracker.Services.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace FinTracker.Api.Services
{
    public class BudgetService : BaseService
    {
        public IEnumerable<Grouping<TblCategory, TblBudget>> GetBudgetItemGroups()
        {
            return db.TblBudgets
                .Include(b => b.Category)
                .GroupBy(b => b.Category)
                .AsEnumerable()
                .Where(g => g.Key != null)
                .Select(g => new Grouping<TblCategory, TblBudget>(g.Key!, g.OrderByDescending(e => e.EffectiveDate)))
                .OrderBy(g => g.Group.CategoryName);
        }

        public TblBudget CreateBudgetItem(BudgetViewModel model)
        {
            TblBudget tblBudget = model.ToTblBudget();
            db.TblBudgets.Entry(tblBudget).State = EntityState.Added;
            db.SaveChanges();
            return tblBudget;
        }

        public TblBudget PutBudgetItem(int budgetItemId, BudgetViewModel model)
        {
            TblBudget budget = model.ToTblBudget(budgetItemId);
            db.TblBudgets.Entry(budget).State = EntityState.Modified;
            db.SaveChanges();
            return budget;
        }

        public void DeleteBudgetItem(int id)
        {
            TblBudget? budgetItem = db.TblBudgets.Find(id);
            if (budgetItem != null)
            {
                db.TblBudgets.Entry(budgetItem).State = EntityState.Deleted;
                db.SaveChanges();
            } else
            {
                throw new EntityNotFoundException();
            }
        }
    }
}
