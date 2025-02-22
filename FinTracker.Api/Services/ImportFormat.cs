using FinTracker.Api.Models;
using FinTracker.Services.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace FinTracker.Api.Services
{
    public class ImportFormat : BaseService
    {
        public TblImportFormat[] GetImportFormats()
        {
            return db.TblImportFormats.OrderBy(e => e.ImportFormatName).ToArray();
        }

        public TblImportFormat CreateImportFormat(ImportFormatViewModel model)
        {
            TblImportFormat tblImportFileFormat = model.ToTblImportFormat();
            db.TblImportFormats.Entry(tblImportFileFormat).State = EntityState.Added;
            db.SaveChanges();
            return tblImportFileFormat;
        }

        public TblImportFormat PutImportFormat(int importFileFormatId, ImportFormatViewModel model)
        {
            TblImportFormat importFileFormat = model.ToTblImportFormat(importFileFormatId);
            db.TblImportFormats.Entry(importFileFormat).State = EntityState.Modified;
            db.SaveChanges();
            return importFileFormat;
        }
        
        public void DeleteImportFormat(int id)
        {
            TblImportFormat? importFileFormat = db.TblImportFormats.Find(id);
            if (importFileFormat != null)
            {
                db.TblImportFormats.Entry(importFileFormat).State = EntityState.Deleted;
                db.SaveChanges();
            }
        }
    }
}
