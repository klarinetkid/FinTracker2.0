using FinTracker.Api.Common;
using FinTracker.Services.Data;

namespace FinTracker.Api.Models
{
    public class BaseViewModel
    {
        internal ApplicationDbContext db = Helper.GetDbContext();
    }
}