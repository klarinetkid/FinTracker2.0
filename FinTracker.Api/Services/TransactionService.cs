using FinTracker.Api.Models;
using FinTracker.Services.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace FinTracker.Api.Services
{
    public class TransactionService : BaseService
    {
        public TblTransaction? PatchTransaction(TransactionViewModel model)
        {
            if (!model.Id.HasValue) throw new Exception("id == null");

            TblTransaction? tblTransaction = db.TblTransactions.Find(model.Id.Value);
            if (tblTransaction != null)
            {
                tblTransaction.CategoryId = model.CategoryId;
                db.TblTransactions.Entry(tblTransaction).State = EntityState.Modified;
                db.SaveChanges();
            }

            return db.TblTransactions.Include(e => e.Category).FirstOrDefault(e => e.Id == model.Id.Value);
        }
    }
}
