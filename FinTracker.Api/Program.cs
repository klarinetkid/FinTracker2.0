
using FinTracker.Api.Common;

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

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            //app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
