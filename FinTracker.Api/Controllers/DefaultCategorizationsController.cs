using FinTracker.Api.Models;
using FinTracker.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace FinTracker.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DefaultCategorizationsController : Controller
    {
        private readonly DefaultCategorizationService service = new ();

        [HttpPatch("$batch")]
        public int BatchPatch(DefaultCategorizationViewModel[] defaultCategorizations)
        {
            return service.BatchPatch(defaultCategorizations);
        }
    }
}
