﻿using FinTracker.Services.Data.Entities;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel;

namespace FinTracker.Services.Data
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<TblCategory> TblCategories { get; set; }
        public DbSet<TblBudgetItem> TblBudgetItems { get; set; }
        public DbSet<TblTransaction> TblTransactions { get; set; }
        public DbSet<TblImportFormat> TblImportFormats { get; set; }
        public DbSet<TblMemo> TblMemos { get; set; }

        // views
        public DbSet<VwCategoryTransactionCount> VwCategoryTransactionCount { get; set; }

        public ApplicationDbContext(string connectionString) : base(GetOptions(connectionString))
        {
        }

        private static DbContextOptions GetOptions(string connectionString)
        {
            return new DbContextOptionsBuilder().UseSqlServer(connectionString).Options;
        }

        public CategoryTotal[] GetCategoryTotals(DateOnly start, DateOnly end)
        {
            CategoryTotal[] totals = Database.SqlQuery<CategoryTotal>($"SpGetCategoryTotals {start}, {end}").ToArray();

            // unfortunately Database.SqlQuery will not navigate related entities
            // but this isn't so bad
            foreach (CategoryTotal total in totals)
                if (total.CategoryId != null) total.Category = TblCategories.Find(total.CategoryId);

            return totals;
        }

        public IQueryable<TblTransaction> TransactionsInRange(DateOnly rangeStart, DateOnly rangeEnd)
        {
            return TblTransactions.Where(t => t.Date >= rangeStart && t.Date < rangeEnd);
        }

        public bool DoesTransactionExist(DateOnly date, string memo, int amount)
        {
            return TblTransactions.Any(t => t.Date == date && t.Memo == memo && t.Amount == amount);
        }
    }
}
