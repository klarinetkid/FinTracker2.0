using FinTracker.Services;
using FinTracker.Services.Data.Entities;
using FinTracker.Services.Data;

namespace FinTracker.Api.Models
{
    public class BreakdownViewModel : BaseViewModel
    {
        public DateOnly Start { get; set; }
        public DateOnly End { get; set; }

        public CategoryTotal[] CategoryTotals { get; set; }
        public TblBudgetItem[] EffectiveBudgetItems { get; set; }
        public TblTransaction[] Transactions { get; set; }
        private IQueryable<TblTransaction> _transactions;
        // TODO: figure out best way to include this calculation
        public int TotalIn
        {
            get
            {
                return _transactions.Where(t => t.Amount > 0).Sum(t => t.Amount);
            }
        }

        public int TotalOut
        {
            get
            {
                return _transactions.Where(t => t.Amount < 0).Sum(t => t.Amount);
            }
        }

        public string Title
        {
            get
            {
                // possible values:
                //      January 2024 (whole month)
                //      Year 2024 (whole year)
                //      January - March 2024 (months in the same year)
                //      November 2023 - February 2024
                if (End == Start.AddMonths(1))
                    return Start.ToString("MMMM yyyy");
                else if (End == Start.AddYears(1))
                    return "Year " + Start.ToString("yyyy");
                else
                {
                    if (Start.Year == End.Year)
                    {
                        return Start.ToString("MMMM") + " - " +
                            End.AddDays(-1).ToString("MMMM yyyy");
                    }
                    else
                    {
                        return Start.ToString("MMMM yyyy") + " - " +
                            End.AddDays(-1).ToString("MMMM yyyy");
                    }
                }
            }
        }

        public BreakdownViewModel(DateOnly rangeStart, DateOnly rangeEnd)
        {
            Start = rangeStart;
            End = rangeEnd;
            CategoryTotals = db.GetCategoryTotals(Start, End);

            _transactions = db.TransactionsInRange(Start, End);

            // to be requested explicitly
            EffectiveBudgetItems = [];
            Transactions = [];
        }

        public static BreakdownViewModel GetMonthBreakdown(DateOnly monthStart)
        {
            return new BreakdownViewModel(monthStart, monthStart.AddMonths(1));
        }

        public void IncludeEffectiveBudgetItems()
        {
            EffectiveBudgetItems = db.GetBudgetItemsForDate(End).ToArray();
        }

        public void IncludeTransactions()
        {
            Transactions = _transactions.OrderBy(e => e.Date).ToArray();
        }
    }
}