using FinTracker.Services.Data.Entities;

namespace FinTracker.Api.Models
{
    public class CategoryViewModel : BaseViewModel
    {
        public TblCategory[] GetCategories()
        {
            return db.TblCategories.OrderBy(e => e.CategoryName).ToArray();
        }
    }
}
