using System.Runtime.CompilerServices;

namespace FinTracker.Api.Common
{
    public static class Extensions
    {
        public static DateTime ToDateTime(this DateOnly date)
        {
            return date.ToDateTime(new TimeOnly(0, 0, 0));
        }
    }
}
