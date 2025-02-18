using FinTracker.Api.Models;
using FinTracker.Services.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace FinTracker.Api.Services
{
    public class TransactionService : BaseService
    {
        private readonly DefaultCategorizationService defaultCategorizationService = new ();

        public TblTransaction? PatchTransaction(int transactionId, TransactionViewModel model)
        {
            TblTransaction? tblTransaction = db.TblTransactions.Find(transactionId);
            if (tblTransaction != null)
            {
                tblTransaction.CategoryId = model.CategoryId;
                db.TblTransactions.Entry(tblTransaction).State = EntityState.Modified;
                db.SaveChanges();
            }

            return db.TblTransactions.Include(e => e.Category).FirstOrDefault(e => e.Id == transactionId);
        }

        public TransactionViewModel[] PrepareImport(TransactionViewModel[] transactions)
        {
            foreach (TransactionViewModel transaction in transactions)
            {
                transaction.IsAlreadyImported = transaction.Date.HasValue && transaction.Memo != null && transaction.Amount.HasValue
                    ? db.DoesTransactionExist(transaction.Date.Value, transaction.Memo, transaction.Amount.Value)
                    : false;
                TblCategory? defaultCategory = transaction.Memo != null
                    ? defaultCategorizationService.GetDefaultCategory(transaction.Memo)
                    : null;
                if (defaultCategory != null)
                {
                    transaction.CategoryId = defaultCategory.Id;
                    transaction.Category = defaultCategory;
                    transaction.IsDefaultCategorized = true;
                }
            }

            return transactions.OrderBy(e => e.Date).ToArray();
        }

        //public TblTransaction Create(TransactionViewModel transaction)
        //{
        //    TblTransaction tblTransaction = transaction.ToTblTransaction();
        //    db.TblTransactions.Entry(tblTransaction).State = EntityState.Modified;
        //}

        public int BatchCreate(TransactionViewModel[] transactions)
        {
            //foreach (TransactionViewModel transaction in transactions)
            db.TblTransactions.AddRange(transactions.Select(t => t.ToTblTransaction()));
                    //Entry(transaction.ToTblTransaction()).State = EntityState.Modified;
            return db.SaveChanges();
        }
    }
}
