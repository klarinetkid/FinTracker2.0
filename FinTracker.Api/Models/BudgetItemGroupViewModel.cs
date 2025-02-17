using FinTracker.Services.Data.Entities;

namespace FinTracker.Api.Models
{
    public class BudgetItemGroupViewModel
    {
        public TblCategory Category { get; set; }
        public TblBudgetItem[] BudgetItems { get; set; }

        public BudgetItemGroupViewModel(TblCategory category, IEnumerable<TblBudgetItem> budgetItems) 
        {
            Category = category;
            BudgetItems = budgetItems.ToArray();
        }
    }
}
