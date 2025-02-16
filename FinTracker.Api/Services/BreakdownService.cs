using FinTracker.Api.Models;
using FinTracker.Services.Data.Entities;

namespace FinTracker.Api.Services
{
    public class BreakdownService : BaseService
    {
        public BreakdownViewModel GetBreakdown(BreakdownQuery query)
        {
            if (!query.IsValid()) throw new ArgumentException();

            IEnumerable<TblTransaction> transactions = db.TransactionsInRange(query.Start.Value, query.End.Value);
            CategoryTotal[] categoryTotals = db.GetCategoryTotals(query.Start.Value, query.End.Value);

            BreakdownViewModel model = new BreakdownViewModel(query.Start.Value, query.End.Value, transactions, categoryTotals);

            if (query.Includes != null)
            {
                if (query.Includes.Contains(BreakdownIncludes.Transactions))
                    model.IncludeTransactions();
            }

            return model;
        }

        public IEnumerable<BreakdownViewModel> GetMonthlyBreakdownsForYear(int year)
        {
            IEnumerable<DateOnly> months = Enumerable.Range(1, 12).Select(m => new DateOnly(year, m, 1));
            return months.Select(m => GetBreakdown(new BreakdownQuery() { Start = m, End = m.AddMonths(1) }));
        }
    }

    public class BreakdownQuery
    {
        public DateOnly? Start { get; set; }
        public DateOnly? End { get; set; }
        public BreakdownIncludes[]? Includes { get; set; }

        public bool IsValid()
        {
            return Start.HasValue && End.HasValue && End.Value > Start.Value;
        }
    }

    public enum BreakdownIncludes
    {
        BudgetItems,
        Transactions
    }
}
