using FinTracker.Api.Common;
using FinTracker.Api.Controllers;
using FinTracker.Api.Models;
using FinTracker.Services.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace FinTracker.Api.Services
{
    public class TransactionService : BaseService
    {
        private readonly MemoService memoCategorizationService = new ();

        public PaginatedResponse<TblTransaction> GetTransactions(TransactionQuery? query)
        {
            IQueryable<TblTransaction> transactions = db.TblTransactions
                .Include(e => e.Category)
                .OrderBy(e => e.Date)
                .AsQueryable();

            if (query != null)
            {
                if (query.After.HasValue)
                    transactions = transactions.Where(t => t.Date >= query.After);

                if (query.Before.HasValue)
                    transactions = transactions.Where(t => t.Date < query.Before);

                if (query.Search != null)
                    transactions = transactions.Where(t => t.Memo != null && t.Memo.Contains(query.Search));

                if (query.CategoryId != null)
                    transactions = transactions.Where(t => t.CategoryId == (query.CategoryId >= 0 ? query.CategoryId : null));
            }

            int pageNumber = query != null ? query.PageNumber : 0;

            return new PaginatedResponse<TblTransaction>()
            {
                Results = transactions.Skip(pageNumber * Helper.AppConfig.ResponsePageSize).Take(Helper.AppConfig.ResponsePageSize).ToArray(),
                CurrentPage = pageNumber,
                PageSize = Helper.AppConfig.ResponsePageSize,
                TotalItems = transactions.Count(),
                TotalPages = (int)Math.Ceiling((float)transactions.Count() / Helper.AppConfig.ResponsePageSize),
            };
        }

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
                    ? memoCategorizationService.GetMemoCategory(transaction.Memo)
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

    public class TransactionQuery
    {
        public int PageNumber { get; set; } = 0;
        public string? Search { get; set; }
        public int? CategoryId { get; set; }
        public DateOnly? Before { get; set; }
        public DateOnly? After { get; set; }
    }
}
