using FinTracker.Api.Common;
using FinTracker.Api.Models;
using FinTracker.Services.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace FinTracker.Api.Services
{
    public class CategoryService : BaseService
    {
        public TblCategory? GetCategory(int id)
        {
            return db.TblCategories.Find(id);
        }

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

        public TblCategory? PutCategory(int categoryId, CategoryViewModel model)
        {
            TblCategory category = model.ToTblCategory(categoryId);
            db.TblCategories.Entry(category).State = EntityState.Modified;
            db.SaveChanges();
            return category;
        }

        public void DeleteCategory(int id)
        {
            TblCategory? category = db.TblCategories.Find(id);
            if (category != null)
            {
                db.TblCategories.Entry(category).State = EntityState.Deleted;
                db.SaveChanges();
            }
            else
            {
                throw new EntityNotFoundException();
            }
        }
    }
}
