namespace FinTracker.Api.Models
{
    public class CountsViewModel
    {
        public required int Budgets { get; set; }
        public required int Categories { get; set; }
        public required int ImportFormats { get; set; }
        public required int Memos { get; set; }
        public required int Transactions { get; set; }
    }
}
