using FinTracker.Api.Common;

namespace FinTracker.Api.Middleware
{
    public class ApiVersionMiddleware
    {
        private readonly RequestDelegate _next;

        public ApiVersionMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            context.Response.OnStarting(() =>
            {
                context.Response.Headers.Append("X-API-Version", Helper.AppConfig.ApiVersion);
                return Task.CompletedTask;
            });

            await _next(context);
        }
    }
}
