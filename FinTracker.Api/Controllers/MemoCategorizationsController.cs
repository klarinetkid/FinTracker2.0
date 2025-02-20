using FinTracker.Api.Models;
using FinTracker.Api.Services;
using FinTracker.Services.Data.Entities;
using Microsoft.AspNetCore.Mvc;

namespace FinTracker.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MemoCategorizationsController : Controller
    {
        private readonly MemoCategorizationService service = new ();

        [HttpGet("Grouped")]
        public MemoCategorizationGroupViewModel[] Grouped()
        {
            return service.GetGrouped();
        }


        [HttpPatch("{id?}")]
        public TblMemoCategorization? Patch(int? id, MemoCategorizationViewModel model)
        {
            if (id == null) throw new Exception();
            return service.PatchMemoCategorization(id.Value, model);
        }

        [HttpDelete("{id?}")]
        public IActionResult Delete(int? id)
        {
            if (id == null) throw new Exception();
            service.DeleteMemoCategorization(id.Value);
            return Ok();
        }

        [HttpPatch("$batch")]
        public int BatchPatch(MemoCategorizationViewModel[] categorizations)
        {
            return service.BatchPatch(categorizations);
        }
    }
}
