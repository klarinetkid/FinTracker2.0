using Microsoft.EntityFrameworkCore;
using System.Runtime.CompilerServices;

namespace FinTracker.Api.Common
{
    public static class Extensions
    {
        public static DateTime ToDateTime(this DateOnly date)
        {
            return date.ToDateTime(new TimeOnly(0, 0, 0));
        }

        /// <summary>
        /// Returns the entity, or throws an <c>EntityNotFoundException</c> if not found.
        /// </summary>
        public static T FindEntity<T>(this DbSet<T> table, int id) where T : class
        {
            return table.Find(id) ?? throw new EntityNotFoundException();
        }
    }
}
