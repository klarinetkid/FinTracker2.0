using FinTracker.Services.Data.Entities;

namespace FinTracker.Api.Models
{
    public interface IEntityViewModel<TblClass> where TblClass : BaseEntity
    {
        public TblClass ToTblEntity(int id = 0);
    }
}
