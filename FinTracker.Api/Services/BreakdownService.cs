using FinTracker.Api.Common;
using FinTracker.Api.Models;
using FinTracker.Services.Data.Entities;
using System.Globalization;

namespace FinTracker.Api.Services
{
    public class BreakdownService : BaseService
    {
        public BreakdownViewModel GetBreakdown(BreakdownQuery query)
        {
            if (!query.IsValid()) throw new ArgumentException();

            IEnumerable<TblTransaction> transactions = db.TransactionsInRange(query.Start!.Value, query.End!.Value);
            CategoryTotal[] categoryTotals = db.GetCategoryTotals(query.Start.Value, query.End.Value);

            return new BreakdownViewModel(query.Start.Value, query.End.Value, transactions, categoryTotals);
        }

        public BreakdownViewModel GetBreakdown(DateOnly start, DateOnly end)
        {
            return GetBreakdown(new BreakdownQuery() { Start = start, End = end });
        }

        public BreakdownCollection GetMonthlyBreakdownsForYear(int year)
        {
            IEnumerable<DateOnly> months = Enumerable.Range(1, 12).Select(m => new DateOnly(year, m, 1));
            return new BreakdownCollection(months.Select(m => GetBreakdown(m, m.AddMonths(1))));
        }

        public BreakdownCollection GetWeeklyBreakdownsForYear(int year)
        {
            DateOnly yearStart = DateOnly.FromDateTime(ISOWeek.GetYearStart(year));
            int numWeeks = ISOWeek.GetWeeksInYear(year);
            IEnumerable<DateOnly> weekStarts = Enumerable.Range(0, numWeeks).Select(weekNum => yearStart.AddDays(weekNum * 7));
            return new BreakdownCollection(weekStarts.Select(w => GetBreakdown(w, w.AddDays(7))));
        }

        public BreakdownCollection GetYearlyBreakdowns()
        {
            int[] availableYears = new MetadataService().GetAvailableYears();
            return new BreakdownCollection(availableYears
                .Select(year => new DateOnly(year, 1, 1))
                .Select(year => GetBreakdown(year, year.AddYears(1))));
        }
    }

    public class BreakdownQuery
    {
        public DateOnly? Start { get; set; }
        public DateOnly? End { get; set; }
        
        public bool IsValid()
        {
            return Start.HasValue && End.HasValue && End.Value > Start.Value;
        }
    }
}
