
using FinTracker.Api.Common;
using FinTracker.Api.Middleware;

namespace FinTracker.Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // init static app config
            Helper.AppConfig = new AppConfig(builder.Configuration);

            builder.Services.AddControllers(options =>
            {
                options.Filters.Add(new EntityNotFoundExceptionFilter());
            });
            
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddCors(options =>
            {
                options.AddDefaultPolicy(policy =>
                {
                    policy.WithOrigins(Helper.AppConfig.ClientURL)
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .WithExposedHeaders("X-API-Version");
                });
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseMiddleware<ApiVersionMiddleware>();

            app.UseCors();
            app.MapControllers();

            app.Run();
        }
    }
}
