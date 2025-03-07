namespace FinTracker.Api.Models
{
    public class TrendLineCollection
    {
        public TrendLine[] Lines { get; set; }
        
        public int LowerBound => allPts.Min();
        public int UpperBound => allPts.Max();
        
        private IEnumerable<int> allPts => 
            Lines.SelectMany(l => 
                l.Points.Select(p => p.PlotValue));

        public TrendLineCollection(TrendLine[] lines)
        {
            Lines = lines;
        }
    }
}
