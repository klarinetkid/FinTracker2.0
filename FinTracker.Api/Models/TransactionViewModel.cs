using FinTracker.Services.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace FinTracker.Api.Models
{
    public class TransactionViewModel
    {
        public int? Id { get; set; }
        public DateTime? Date { get; set; }
        public int? Amount { get; set; }
        public string? Memo { get; set; }
        public int? CategoryId { get; set; }
        public TblCategory? Category { get; set; }

        //public TblTransaction? PatchTransaction()
        //{
        //    if (!Id.HasValue) throw new Exception("id == null");

        //    TblTransaction? tblTransaction = db.TblTransactions.Find(Id.Value);
        //    if (tblTransaction != null)
        //    {
        //        tblTransaction.CategoryId = CategoryId;
        //        db.TblTransactions.Entry(tblTransaction).State = EntityState.Modified;
        //        db.SaveChanges();
        //    }

        //    return GetTransaction(Id.Value);
        //}

        //public TblTransaction? GetTransaction(int id)
        //{
        //    return db.TblTransactions.Include(e => e.Category).FirstOrDefault(e => e.Id == id);
        //}
    }
}
