using FinTracker.Api.Common;
using FinTracker.Api.Models;
using FinTracker.Services.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace FinTracker.Api.Services
{
    public class BudgetService : BaseEntityService<TblBudget>
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

        public TblBudget CreateBudgetItem(BudgetViewModel model) => addEntityAndSave(model);
        public TblBudget PutBudgetItem(int id, BudgetViewModel model) => putEntityAndSave(id, model);
        public void DeleteBudgetItem(int id) => deleteEntityAndSave(id);
    }
}
