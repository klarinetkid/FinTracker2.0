using FinTracker.Api.Common;
using FinTracker.Services.Data;

namespace FinTracker.Api.Services
{
    public class BaseService
    {
        internal ApplicationDbContext db = new ApplicationDbContext(Helper.AppConfig.ConnectionString);
    }
}
