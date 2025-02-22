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

        [HttpPut("{id?}")]
        public TblImportFormat? PutImportFormat(int? id, ImportFormatViewModel model)
        {
            if (id == null) throw new Exception("Id is null");
            return service.PutImportFormat(id.Value, model);
        }

        [HttpDelete("{id?}")]
        public IActionResult DeleteImportFormat(int? id)
        {
            if (id == null) return BadRequest();
            service.DeleteImportFormat(id.Value);
            return Ok();
        }
    }
}
