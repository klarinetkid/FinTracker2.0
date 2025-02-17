using FinTracker.Api.Models;
using FinTracker.Api.Services;
using FinTracker.Services.Data.Entities;
using Microsoft.AspNetCore.Mvc;

namespace FinTracker.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ImportFileFormatsController : Controller
    {
        private readonly ImportFileFormatService service = new();

        [HttpGet]
        public TblImportFileFormat[] List()
        {
            return service.GetImportFileFormats();
        }

        [HttpPost]
        public TblImportFileFormat Create(ImportFileFormatViewModel model)
        {
            return service.CreateImportFileFormat(model);
        }

        [HttpPut("{id?}")]
        public TblImportFileFormat? Put(int? id, ImportFileFormatViewModel model)
        {
            if (id == null) throw new Exception("Id is null");
            return service.PutImportFileFormat(id.Value, model);
        }

        [HttpDelete("{id?}")]
        public IActionResult Delete(int? id)
        {
            if (id == null) return BadRequest();
            service.DeleteImportFileFormat(id.Value);
            return Ok();
        }
    }
}
