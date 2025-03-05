using FinTracker.Api.Models;

namespace FinTracker.Api.Services
{
    public class TrendService : BaseService
    {
        public TrendLineCollection GetTrend(TrendQuery query)
        {
            TrendLine[] lines = query.CategoryId.Select(c => new TrendLine()
            {
                Category = db.TblCategories.Find(c),
                Points = db.GetTrendPoints(query.Start.Value, query.End.Value, query.Interval, query.IntervalNum.Value, c)
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
    }
}
