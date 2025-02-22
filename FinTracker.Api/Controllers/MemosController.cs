using FinTracker.Api.Models;
using FinTracker.Api.Services;
using FinTracker.Services.Data.Entities;
using Microsoft.AspNetCore.Mvc;

namespace FinTracker.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MemosController : Controller
    {
        private readonly MemoService service = new ();

        [HttpGet("Grouped")]
        public Grouping<TblCategory, TblMemo>[] Grouped()
        {
            return service.GetGrouped().ToArray();
        }


        [HttpPatch("{id?}")]
        public TblMemo? Patch(int? id, MemoViewModel model)
        {
            if (id == null) throw new Exception();
            return service.PatchMemo(id.Value, model);
        }

        [HttpDelete("{id?}")]
        public IActionResult Delete(int? id)
        {
            if (id == null) throw new Exception();
            service.DeleteMemo(id.Value);
            return Ok();
        }

        [HttpPatch("$batch")]
        public int BatchPatch(MemoViewModel[] categorizations)
        {
            return service.BatchPatch(categorizations);
        }
    }
}
