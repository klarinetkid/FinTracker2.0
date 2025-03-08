using FinTracker.Api.Common;
using FinTracker.Api.Models;
using FinTracker.Services.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace FinTracker.Api.Services
{
    public class BaseEntityService<TblClass> : BaseService where TblClass : BaseEntity
    {
        internal TblClass addEntityAndSave(IEntityViewModel<TblClass> model)
        {
            TblClass tblEntity = model.ToTblEntity();
            db.Entry(tblEntity).State = EntityState.Added;
            db.SaveChanges();
            return tblEntity;
        }

        internal TblClass putEntityAndSave(int id, IEntityViewModel<TblClass> model)
        {
            TblClass tblEntity = model.ToTblEntity(id);
            db.Entry(tblEntity).State = EntityState.Modified;
            db.SaveChanges();
            return tblEntity;
        }

        internal void deleteEntityAndSave(int id)
        {
            TblClass tblEntity = db.FindEntity<TblClass>(id);
            db.Entry(tblEntity).State = EntityState.Deleted;
            db.SaveChanges();
        }
    }
}
