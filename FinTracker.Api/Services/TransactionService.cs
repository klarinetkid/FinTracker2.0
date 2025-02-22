﻿using FinTracker.Api.Common;
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

                if (query.OrderBy != null)
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
                db.TblTransactions.Entry(tblTransaction).State = EntityState.Modified;
                db.SaveChanges();
            }

            return db.TblTransactions.Include(e => e.Category).FirstOrDefault(e => e.Id == transactionId);
        }

        public TransactionViewModel[] PrepareImport(TransactionViewModel?[] transactions)
        {
            MemoService memoService = new();

            List<TransactionViewModel> results = new ();
            foreach (TransactionViewModel? transaction in transactions)
            {
                if (transaction == null) continue;

                transaction.IsAlreadyImported = transaction.Date.HasValue && transaction.Memo != null && transaction.Amount.HasValue
                    ? db.DoesTransactionExist(transaction.Date.Value, transaction.Memo, transaction.Amount.Value)
                    : false;
                
                transaction.SavedMemo = memoService.GetMemo(transaction.Memo);
                transaction.CategoryId = transaction.SavedMemo?.CategoryId;
                transaction.Category = transaction.SavedMemo?.Category;

                results.Add(transaction);
            }

            return results.OrderBy(e => e.Date).ToArray();
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

        public string? OrderBy { get; set; }
        public string? Order { get; set; }
    }
}
