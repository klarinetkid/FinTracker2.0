using FinTracker.Services.Data.Entities;

namespace FinTracker.Api.Models
{
    public class TrendLine
    {
        public required TblCategory Category { get; set; }
        public required TrendPoint[] Points { get; set; }
    }
}
