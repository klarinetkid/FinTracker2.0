using FinTracker.Api.Common;
using FinTracker.Api.Models;
using FinTracker.Services.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace FinTracker.Api.Services
{
    public class CategoryService : BaseEntityService<TblCategory>
    {
        public TblCategory? GetCategory(int id)
        {
            return db.TblCategories.Find(id);
        }

        public TblCategory[] GetCategories()
        {
            return db.TblCategories.OrderBy(e => e.CategoryName).ToArray();
        }

        public VwCategoryReferenceCounts[] GetCategoryTransactionCounts()
        {
            return db.VwCategoryReferenceCounts.OrderBy(e => e.CategoryName).ToArray();
        }

        public TblCategory CreateCategory(CategoryViewModel model) => addEntityAndSave(model);
        public TblCategory PutCategory(int id, CategoryViewModel model) => putEntityAndSave(id, model);
        public void DeleteCategory(int id) => deleteEntityAndSave(id);
    }
}
