using FinTracker.Api.Common;
using FinTracker.Api.Controllers;
using FinTracker.Api.Models;
using FinTracker.Services.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace FinTracker.Api.Services
{
    public class TransactionService : BaseService
    {
        public PaginatedResponse<TblTransaction> GetTransactions(TransactionQuery? query)
        {
            IQueryable<TblTransaction> trxs = db.TblTransactions
                .Include(e => e.Category)
                .AsQueryable();

            if (query != null)
            {
                if (query.After.HasValue)
                    trxs = trxs.Where(t => t.Date >= query.After);

                if (query.Before.HasValue)
                    trxs = trxs.Where(t => t.Date < query.Before);

                if (query.Search != null)
                    trxs = trxs.Where(t => t.Memo != null && t.Memo.Contains(query.Search));

                if (query.CategoryId != null)
                    trxs = trxs.Where(t => t.CategoryId == (query.CategoryId >= 0 ? query.CategoryId : null));

                if (query.MoreThan.HasValue)
                    trxs = trxs.Where(t => t.Amount >= query.MoreThan.Value);

                if (query.LessThan.HasValue)
                    trxs = trxs.Where(t => t.Amount <= query.LessThan.Value);

                if (query.Type != null)
                    switch (query.Type)
                    {
                        case "cash":
                            trxs = trxs.Where(t => t.IsCashTransaction);
                            break;
                        case "credit":
                            trxs = trxs.Where(t => !t.IsCashTransaction);
                            break;
                    }

                if (query.OrderBy != null && trxs.Count() <= Helper.AppConfig.OrderingRowLimit)
                {
                    // don't want to use reflection, just switch case this bitch
                    switch (query.OrderBy.ToLower()) 
                    {
                        case "date":
                            trxs = trxs.OrderBy(t => t.Date);
                            break;
                        case "memo":
                            trxs = trxs.OrderBy(t => t.Memo);
                            break;
                        case "amount":
                            trxs = trxs.OrderBy(t => t.Amount);
                            break;
                        case "category":
                            trxs = trxs
                                .OrderBy(t => t.Category == null)
                                .ThenBy(t => t.Category != null ? t.Category.CategoryName : "");
                            break;
                    }

                    if (query.Order != null&& query.Order.ToLower() == "desc")
                    {
                        // ensure query has order before reversing
                        if (trxs.Expression.Type == typeof(IOrderedQueryable<TblTransaction>))
                            trxs = trxs.Reverse();
                    }
                }
            }

            int pageNumber = query != null ? query.PageNumber : 0;

            return new PaginatedResponse<TblTransaction>()
            {
                Results = trxs.Skip(pageNumber * Helper.AppConfig.ResponsePageSize).Take(Helper.AppConfig.ResponsePageSize).ToArray(),
                CurrentPage = pageNumber,
                PageSize = Helper.AppConfig.ResponsePageSize,
                TotalItems = trxs.Count(),
                TotalPages = (int)Math.Ceiling((float)trxs.Count() / Helper.AppConfig.ResponsePageSize),
            };
        }

        public TblTransaction? PatchTransaction(int transactionId, TransactionViewModel model)
        {
            TblTransaction? tblTransaction = db.TblTransactions.Find(transactionId);
            if (tblTransaction != null)
            {
                tblTransaction.CategoryId = model.CategoryId;
                if (tblTransaction.IsCashTransaction)
                {
                    tblTransaction.Date = model.Date ?? tblTransaction.Date;
                    tblTransaction.Memo = model.Memo ?? tblTransaction.Memo;
                }
                
                db.TblTransactions.Entry(tblTransaction).State = EntityState.Modified;
                db.SaveChanges();
            }
            else
            {
                throw new EntityNotFoundException();
            }

            return db.TblTransactions.Include(e => e.Category).FirstOrDefault(e => e.Id == transactionId);
        }

        public TransactionViewModel[] PrepareImport(TransactionViewModel?[] transactions)
        {
            MemoService memoService = new();

            Dictionary<string, TblMemo> cachedMemos = new ();
            foreach (TblMemo memo in db.TblMemos.Include(m => m.Category))
            {
                cachedMemos.Add(memo.Memo, memo);
            }

            List<TransactionViewModel> results = new ();
            foreach (TransactionViewModel? transaction in transactions)
            {
                if (transaction == null || transaction.Memo == null) continue;

                transaction.IsAlreadyImported = transaction.Date.HasValue && transaction.Amount.HasValue
                    ? db.DoesTransactionExist(transaction.Date.Value, transaction.Memo, transaction.Amount.Value)
                    : false;
                
                if (cachedMemos.ContainsKey(transaction.Memo))
                {
                    transaction.SavedMemo = cachedMemos[transaction.Memo];
                    transaction.CategoryId = transaction.SavedMemo?.CategoryId;
                    transaction.Category = transaction.SavedMemo?.Category;
                }

                results.Add(transaction);
            }

            return results.OrderBy(e => e.Date).ToArray();
        }

        public TblTransaction CreateCashTransaction(TransactionViewModel transaction)
        {
            TblTransaction tblTransaction = transaction.ToTblTransaction();
            tblTransaction.IsCashTransaction = true;
            db.TblTransactions.Entry(tblTransaction).State = EntityState.Added;
            db.SaveChanges();
            return tblTransaction;
        }

        public int BatchCreate(TransactionViewModel[] transactions)
        {
            //foreach (TransactionViewModel transaction in transactions)
            db.TblTransactions.AddRange(transactions.Select(t => t.ToTblTransaction()));
                    //Entry(transaction.ToTblTransaction()).State = EntityState.Modified;
            return db.SaveChanges();
        }

        public void DeleteTransaction(int id)
        {
            TblTransaction? transaction = db.TblTransactions.Find(id);
            if (transaction != null)
            {
                db.TblTransactions.Entry(transaction).State = EntityState.Deleted;
                db.SaveChanges();
            }
            else
            {
                throw new EntityNotFoundException();
            }
        }
    }

    public class TransactionQuery
    {
        public int PageNumber { get; set; } = 0;
        public string? Search { get; set; }
        public int? CategoryId { get; set; }

        public DateOnly? Before { get; set; }
        public DateOnly? After { get; set; }

        public int? MoreThan { get; set; }
        public int? LessThan { get; set; }

        public string? OrderBy { get; set; }
        public string? Order { get; set; }

        public string? Type { get; set; }
    }
}
