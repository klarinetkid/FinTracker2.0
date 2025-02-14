using FinTracker.Services.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace FinTracker.Services.Data
{
    public class ApplicationDbContext : DbContext
    {
        #region tables

        public DbSet<TblCategory> TblCategories { get; set; }
        public DbSet<TblBudgetItem> TblBudgetItems { get; set; }
        public DbSet<TblTransaction> TblTransactions { get; set; }
        public DbSet<TblImportFileFormat> TblImportFileFormats { get; set; }
        public DbSet<TblDefaultCategorization> TblDefaultCategorizations { get; set; }

        #endregion

        // reserved category ID 0 for income
        public readonly int IncomeCategoryId = 0;

        public string DbPath { get; init; }

        public ApplicationDbContext(string dbPath)
        {
            DbPath = dbPath;

            //var folder = Environment.SpecialFolder.LocalApplicationData;
            //string path = Environment.GetFolderPath(folder);
            //DbPath = Path.Join(path, "fintracker.db");
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
            => options
                //.UseLazyLoadingProxies() // TODO: really need lazy loading?
                .UseSqlite($"Data Source={DbPath}");

        #region procedures

        // note this is >= rangeStart but < rangeEnd so
        // end date is startDate.AddMonths(1) for entire month
        public IQueryable<TblTransaction> TransactionsInRange(DateOnly rangeStart, DateOnly rangeEnd)
        {
            return TblTransactions.Where(t => t.Date >= rangeStart && t.Date < rangeEnd);
        }

        public IEnumerable<TblBudgetItem> GetBudgetItemsForDate(DateOnly date)
        {
            List<TblBudgetItem> result = new List<TblBudgetItem>();
            IQueryable<TblBudgetItem> items = TblBudgetItems.Include(b => b.Category).Where(b => b.EffectiveDate <= date.ToDateTime(new TimeOnly(0, 0, 0))); // TODO: switch budget item to dateonly
            foreach (var group in items.GroupBy(b => b.CategoryId))
            {
                result.Add(group.OrderBy(b => b.EffectiveDate).Last());
            }

            return result;
        }

        public CategoryTotal[] GetCategoryTotals(DateOnly rangeStart, DateOnly rangeEnd)
        {
            // TODO: this reserved catID should be a constant somewhere
            int periodIncome = TransactionsInRange(rangeStart, rangeEnd).Where(t => t.CategoryId == IncomeCategoryId).Sum(t => t.Amount);

            // prevent divide by 0
            if (periodIncome == 0) periodIncome = 1;

            return TransactionsInRange(rangeStart, rangeEnd).Include(t => t.Category).GroupBy(t => t.Category)
                .Select((g) => new CategoryTotal
                {
                    Total = g.Sum(t => t.Amount),
                    Category = g.Key,
                    Date = rangeStart,
                    PercentOfIncome = (float)(g.Sum(t => t.Amount)) / periodIncome * 100
                }).ToArray();
        }

        public bool DoesTransactionExist(TblTransaction ts)
        {
            return TblTransactions.Where(t => t.Date == ts.Date && t.Memo == ts.Memo && t.Amount == ts.Amount).Any();
        }

        public InOutValues GetInOut(DateOnly rangeStart, DateOnly rangeEnd)
        {
            IQueryable<TblTransaction> transactions = TransactionsInRange(rangeStart, rangeEnd);
            int? pos = transactions.Where(t => t.Amount > 0).Sum(t => t.Amount);
            int? neg = transactions.Where(t => t.Amount < 0).Sum(t => t.Amount);
            return new InOutValues(pos ?? 0, Math.Abs(neg ?? 0));
        }

        #endregion
    }
}
