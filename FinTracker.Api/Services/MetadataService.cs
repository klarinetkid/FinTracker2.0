using FinTracker.Api.Models;

namespace FinTracker.Api.Services
{
    public class MetadataService : BaseService
    {
        public int[] GetAvailableYears()
        {
            return db.TblTransactions.Select(t => t.Date.Year)
                .Distinct().AsEnumerable().OrderDescending().ToArray();
        }
    }
}
