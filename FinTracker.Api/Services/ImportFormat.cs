using FinTracker.Api.Common;
using FinTracker.Api.Models;
using FinTracker.Services.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace FinTracker.Api.Services
{
    public class ImportFormat : BaseEntityService<TblImportFormat>
    {
        public TblImportFormat[] GetImportFormats()
        {
            return db.TblImportFormats.OrderBy(e => e.ImportFormatName).ToArray();
        }

        public TblImportFormat CreateImportFormat(ImportFormatViewModel model) => addEntityAndSave(model);
        public TblImportFormat PutImportFormat(int id, ImportFormatViewModel model) => putEntityAndSave(id, model);
        public void DeleteImportFormat(int id) => deleteEntityAndSave(id);
    }
}
