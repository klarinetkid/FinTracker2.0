using FinTracker.Services.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace FinTracker.Api.Services
{
    public class DefaultCategorizationService : BaseService
    {
        public TblCategory? FindDefault(string memo)
        {
            return db.TblDefaultCategorizations
                .Where(e => e.Memo == memo)
                .Select(e => e.Category) // not sure if this will work without include first
                .FirstOrDefault();
        }
    }
}
