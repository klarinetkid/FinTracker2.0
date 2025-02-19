using FinTracker.Api.Models;
using FinTracker.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace FinTracker.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MemoCategorizationsController : Controller
    {
        private readonly MemoCategorizationService service = new ();

        [HttpPatch("$batch")]
        public int BatchPatch(MemoCategorizationViewModel[] memoCategorizations)
        {
            return service.BatchPatch(memoCategorizations);
        }
    }
}
