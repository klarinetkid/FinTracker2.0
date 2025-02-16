using FinTracker.Api.Models;
using FinTracker.Services.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace FinTracker.Api.Services
{
    public class ImportFileFormatService : BaseService
    {
        public TblImportFileFormat[] GetImportFileFormats()
        {
            return db.TblImportFileFormats.OrderBy(e => e.ImportFileFormatName).ToArray();
        }

        public TblImportFileFormat CreateImportFileFormat(ImportFileFormatViewModel model)
        {
            TblImportFileFormat tblImportFileFormat = model.ToTblImportFileFormat();
            db.TblImportFileFormats.Entry(tblImportFileFormat).State = EntityState.Added;
            db.SaveChanges();
            return tblImportFileFormat;
        }

        public TblImportFileFormat PutImportFileFormat(int importFileFormatId, ImportFileFormatViewModel model)
        {
            TblImportFileFormat importFileFormat = model.ToTblImportFileFormat();
            importFileFormat.Id = importFileFormatId;

            //TblImportFileFormat importFileFormat = db.TblImportFileFormats.Find(importFileFormatId);
            //importFileFormat = model.ToTblImportFileFormat();
            db.TblImportFileFormats.Entry(importFileFormat).State = EntityState.Modified;
            db.SaveChanges();
            return importFileFormat;
        }
        public TblImportFileFormat? PatchImportFileFormat(int importFileFormatId, ImportFileFormatViewModel model)
        {
            TblImportFileFormat? importFileFormat = db.TblImportFileFormats.Find(importFileFormatId);
            if (importFileFormat != null)
            {
                importFileFormat.ImportFileFormatName = model.ImportFileFormatName ?? importFileFormat.ImportFileFormatName;
                importFileFormat.DateKey = model.DateKey ?? importFileFormat.DateKey;
                importFileFormat.MemoFormat = model.MemoFormat ?? importFileFormat.MemoFormat;
                importFileFormat.AmountKey = model.AmountKey ?? importFileFormat.AmountKey;
                importFileFormat.InvertAmounts = model.InvertAmounts ?? importFileFormat.InvertAmounts;
                importFileFormat.HeaderLines = model.HeaderLines ?? importFileFormat.HeaderLines;
                importFileFormat.Delimiter = model.Delimiter ?? importFileFormat.Delimiter;
                importFileFormat.Image = model.Image ?? importFileFormat.Image;

                db.TblImportFileFormats.Entry(importFileFormat).State = EntityState.Modified;
                db.SaveChanges();
            }

            return importFileFormat;
        }

        public void DeleteImportFileFormat(int id)
        {
            TblImportFileFormat? importFileFormat = db.TblImportFileFormats.Find(id);
            if (importFileFormat != null)
            {
                db.TblImportFileFormats.Entry(importFileFormat).State = EntityState.Deleted;
                db.SaveChanges();
            }
        }
    }
}
