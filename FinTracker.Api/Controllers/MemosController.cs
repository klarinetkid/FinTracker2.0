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
        public Grouping<TblCategory?, TblMemo>[] Grouped()
        {
            return service.GetGrouped().ToArray();
        }


        [HttpPatch("{id}")]
        public TblMemo? Patch(int id, MemoViewModel model)
        {
            return service.PatchMemo(id, model);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            service.DeleteMemo(id);
            return Ok();
        }

        [HttpPatch("$batch")]
        public int BatchPatch(MemoViewModel[] memos)
        {
            return service.BatchPatch(memos);
        }
    }
}
