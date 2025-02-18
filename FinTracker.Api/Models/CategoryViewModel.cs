using FinTracker.Services.Data.Entities;

namespace FinTracker.Api.Models
{
    public class CategoryViewModel
    {
        //public int? Id { get; set; }
        public string? CategoryName { get; set; }
        public string? Colour { get; set; }

        public TblCategory ToTblCategory(int id = 0)
        {
            return new TblCategory()
            {
                Id = id,
                CategoryName = CategoryName,
                Colour = Colour
            };
        }
    }
}
