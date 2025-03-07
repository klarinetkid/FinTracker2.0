using FinTracker.Api.Common;
using FinTracker.Api.Models;
using System.Diagnostics.CodeAnalysis;

namespace FinTracker.Api.Services
{
    public class TrendService : BaseService
    {
        public readonly static string[] Intervals = ["week", "month", "year"];

        public TrendLineCollection GetTrends(TrendQuery query)
        {
            if (!query.IsValid()) throw new InvalidOperationException("Invalid query");

            TrendLine[] lines = query.CategoryId.Select(cId => new TrendLine()
            {
                Category = db.TblCategories.Find(cId) ?? throw new EntityNotFoundException(),
                Points = db.GetTrendPoints(query.Start.Value, query.End.Value, query.Interval, query.IntervalNum.Value, cId)
            }).ToArray();

            return new TrendLineCollection(lines);
        }
    }

    public class TrendQuery
    {
        public DateOnly? Start { get; set; }
        public DateOnly? End { get; set; }
        public string? Interval { get; set; }
        public int? IntervalNum { get; set; }
        public int[]? CategoryId { get; set; }

        [MemberNotNullWhen(true, nameof(Start), nameof(End), nameof(Interval), nameof(IntervalNum), nameof(CategoryId))]
        public bool IsValid()
        {
            return Start != null
                && End != null
                && Start.Value > End.Value

                && Interval != null
                && TrendService.Intervals.Contains(Interval.ToLower())

                && IntervalNum != null
                && IntervalNum.Value > 0

                && CategoryId != null
                && CategoryId.Length > 0;
        }
    }
}
