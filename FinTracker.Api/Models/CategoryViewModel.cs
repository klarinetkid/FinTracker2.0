using FinTracker.Services.Data.Entities;

namespace FinTracker.Api.Models
{
    public class CategoryViewModel
    {
        public int? Id { get; set; }
        public string? CategoryName { get; set; }
        public string? Colour { get; set; }

        public TblCategory ToTblCategory()
        {
            return new TblCategory()
            {
                Id = Id.HasValue ? Id.Value : 0,
                CategoryName = CategoryName,
                Colour = Colour
            };
        }
    }
}
