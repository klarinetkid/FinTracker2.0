namespace FinTracker.Api.Models
{
    public class TrendLineCollection
    {
        public TrendLine[] Lines { get; set; }
        public int LowerBound
        {
            get
            {
                IEnumerable<int> allPts = Lines.SelectMany(l => l.Points.Select(p => p.Total.HasValue ? p.Total.Value : 0));
                return allPts.Count() > 0 ? allPts.Min() : 0;
                //return Lines.Min(l => l.Points.Min(p => p.Total.HasValue ? p.Total.Value : 0));
            }
        }
        public int UpperBound
        {
            get
            {
                IEnumerable<int> allPts = Lines.SelectMany(l => l.Points.Select(p => p.Total.HasValue ? p.Total.Value : 0));
                return allPts.Count() > 0 ? allPts.Max() : 0;
                //return Lines.Max(l => l.Points.Max(p => p.Total.HasValue ? p.Total.Value : 0));
            }
        }

        public TrendLineCollection(TrendLine[] lines)
        {
            Lines = lines;
        }
    }
}
