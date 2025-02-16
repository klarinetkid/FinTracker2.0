using FinTracker.Api.Models;
using FinTracker.Services.Data.Entities;

namespace FinTracker.Api.Services
{
    public class ImportFileFormatService : BaseService
    {
        public TblImportFileFormat[] GetImportFileFormats()
        {
            return db.TblImportFileFormats.OrderBy(e => e.ImportFileFormatName).ToArray();
        }
    }
}
