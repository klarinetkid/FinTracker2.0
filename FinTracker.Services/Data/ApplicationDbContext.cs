using FinTracker.Services.Data.Entities;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel;

namespace FinTracker.Services.Data
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<TblCategory> TblCategories { get; set; }
        public DbSet<TblBudget> TblBudgets { get; set; }
        public DbSet<TblTransaction> TblTransactions { get; set; }
        public DbSet<TblImportFormat> TblImportFormats { get; set; }
        public DbSet<TblMemo> TblMemos { get; set; }

        // views
        public DbSet<VwCategoryReferenceCounts> VwCategoryReferenceCounts { get; set; }

        public ApplicationDbContext(string connectionString) : base(GetOptions(connectionString))
        {
        }

        private static DbContextOptions GetOptions(string connectionString)
        {
            return new DbContextOptionsBuilder().UseSqlServer(connectionString).Options;
        }

        public override int SaveChanges()
        {
            UpdateTimestamps();
            return base.SaveChanges();
        }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            UpdateTimestamps();
            return await base.SaveChangesAsync(cancellationToken);
        }

        private void UpdateTimestamps()
        {
            var entries = ChangeTracker.Entries<BaseEntity>();

            foreach (var entry in entries)
            {
                if (entry.State == EntityState.Added)
                {
                    entry.Entity.CreatedOn = DateTime.UtcNow;
                    entry.Entity.ModifiedOn = DateTime.UtcNow;
                }

                if (entry.State == EntityState.Modified)
                {
                    entry.Entity.ModifiedOn = DateTime.UtcNow;
                    entry.Property(e => e.CreatedOn).IsModified = false;
                }
            }
        }


        #region procedures

        public CategoryTotal[] GetCategoryTotals(DateOnly start, DateOnly end)
        {
            CategoryTotal[] totals = Database.SqlQuery<CategoryTotal>($"SpGetCategoryTotals {start}, {end}").ToArray();

            // unfortunately Database.SqlQuery will not navigate related entities
            // but this isn't so bad
            foreach (CategoryTotal total in totals)
                if (total.CategoryId != null) total.Category = TblCategories.Find(total.CategoryId);

            return totals;
        }

        public TrendPoint[] GetTrendPoints(DateOnly start, DateOnly end, string interval, int intervalNum, int categoryId)
        {
            return Database.SqlQuery<TrendPoint>($"SpGetTrendPoints {start}, {end}, {interval}, {intervalNum}, {categoryId}")
                .ToArray();
        }

        public IQueryable<TblTransaction> TransactionsInRange(DateOnly rangeStart, DateOnly rangeEnd)
        {
            return TblTransactions.Where(t => t.Date >= rangeStart && t.Date < rangeEnd);
        }

        public bool DoesTransactionExist(DateOnly date, string memo, int amount)
        {
            // columns in this order to take advantage of index on date, memo, amount
            return TblTransactions.Any(t => t.Date == date && t.Memo == memo && t.Amount == amount);
        }

        #endregion
    }
}
