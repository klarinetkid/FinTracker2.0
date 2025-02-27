using FinTracker.Api.Models;

namespace FinTracker.Api.Services
{
    public class MetadataService : BaseService
    {
        public int[] GetAvailableYears()
        {
            return db.TblTransactions.Select(t => t.Date.Year)
                .Distinct().AsEnumerable().OrderDescending().ToArray();
        }

        public CountsViewModel GetCounts()
        {
            return new CountsViewModel()
            {
                Budgets = db.TblBudgets.Count(),
                Categories = db.TblCategories.Count(),
                ImportFormats = db.TblImportFormats.Count(),
                Memos = db.TblMemos.Count(),
                Transactions = db.TblTransactions.Count(),
            };
        }
    }
}
