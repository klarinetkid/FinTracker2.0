using FinTracker.Api.Models;
using FinTracker.Api.Services;
using FinTracker.Services.Data.Entities;
using Microsoft.AspNetCore.Mvc;

namespace FinTracker.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ImportFormatsController : Controller
    {
        private readonly ImportFormat service = new();

        [HttpGet]
        public TblImportFormat[] List()
        {
            return service.GetImportFormats();
        }

        [HttpPost]
        public TblImportFormat CreateImportFormat(ImportFormatViewModel model)
        {
            return service.CreateImportFormat(model);
        }

        [HttpPut("{id}")]
        public TblImportFormat? PutImportFormat(int id, ImportFormatViewModel model)
        {
            return service.PutImportFormat(id, model);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteImportFormat(int id)
        {
            service.DeleteImportFormat(id);
            return Ok();
        }
    }
}
