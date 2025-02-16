using FinTracker.Api.Models;
using FinTracker.Services.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace FinTracker.Api.Services
{
    public class CategoryService : BaseService
    {
        public TblCategory[] GetCategories()
        {
            return db.TblCategories.OrderBy(e => e.CategoryName).ToArray();
        }

        public VwCategoryTransactionCount[] GetCategoryTransactionCounts()
        {
            return db.VwCategoryTransactionCount.OrderBy(e => e.CategoryName).ToArray();
        }

        public TblCategory CreateCategory(CategoryViewModel model)
        {
            TblCategory tblCategory = model.ToTblCategory();
            db.TblCategories.Entry(tblCategory).State = EntityState.Added;
            db.SaveChanges();
            return tblCategory;
        }

        public void DeleteCategory(CategoryViewModel model)
        {
            if (model.Id == null) throw new Exception("Id == null");

            // TODO: custom exceptions if not found
            TblCategory? category = db.TblCategories.Find(model.Id);
            if (category != null)
            {
                db.TblCategories.Entry(category).State = EntityState.Deleted;
                db.SaveChanges();
            }
        }
    }
}
