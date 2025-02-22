namespace FinTracker.Api.Common
{
    public class PaginatedResponse<T>
    {
        public T[] Results { get; set; }

        public int TotalItems { get; set; }
        public int TotalPages { get; set; }
        public int CurrentPage { get; set; }
        public int PageSize { get; set; }
    }
}
