namespace FinTracker.Api.Models
{
    public class TrendLineCollection
    {
        public TrendLine[] Lines { get; set; }
        
        public int LowerBound => allPts.Count() > 0 ? allPts.Min() : 0;
        public int UpperBound => allPts.Count() > 0 ? allPts.Max() : 0;
        
        private IEnumerable<int> allPts => 
            Lines.SelectMany(l => 
                l.Points.Select(p => p.PlotValue.HasValue ? p.PlotValue.Value : 0));

        public TrendLineCollection(TrendLine[] lines)
        {
            Lines = lines;
        }
    }
}
