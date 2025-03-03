namespace FinTracker.Api.Models
{
    public class BreakdownCollection
    {
        public BreakdownViewModel[] Breakdowns { get; set; }

        public string Type { get; set; }

        public bool IsEmpty
        {
            get
            {
                return !Breakdowns.Any(b => !b.IsEmpty);
            }
        }

        public Int64 TotalIn
        {
            get
            {
                return Breakdowns.Sum(b => b.TotalIn);
            }
        }

        public Int64 TotalOut
        {
            get
            {
                return Breakdowns.Sum(b => b.TotalOut);
            }
        }

        public Int64 TotalIncome
        {
            get
            {
                return Breakdowns.SelectMany(b => b.CategoryTotals)
                    .Where(c => c.Total > 0)
                    .Sum(c => c.Total);
            }
        }

        public BreakdownCollection(string type, IEnumerable<BreakdownViewModel> breakdowns)
        {
            Type = type;
            Breakdowns = breakdowns.ToArray();
        }
    }
}
