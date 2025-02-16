using FinTracker.Api.Services;
using FinTracker.Services.Data.Entities;
using Microsoft.AspNetCore.Mvc;

namespace FinTracker.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ImportFileFormatsController : Controller
    {
        private readonly ImportFileFormatService service = new ();

        [HttpGet]
        public TblImportFileFormat[] List()
        {
            return service.GetImportFileFormats();
        }
    }
}
