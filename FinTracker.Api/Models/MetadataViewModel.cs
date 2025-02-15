namespace FinTracker.Api.Models
{
    public class MetadataViewModel : BaseViewModel
    {
        public int[] GetAvailableYears()
        {
            var x = db.TblTransactions.Select(t => t.Date.Year).ToArray();

            return db.TblTransactions.Select(t => t.Date.Year)
                .Distinct().AsEnumerable().OrderDescending().ToArray();
        }
    }

    // TODO: move this somewhere
    public class TransactionDateRange
    {
        public DateTime? First { get; set; }
        public DateTime? Last { get; set; }
    }
}
