namespace FinTracker.Api.Common
{
    public class AppConfig
    {
        public string ConnectionString => config.GetConnectionString("Connection") ?? throw new Exception("Connection string not defined");
        public int ResponsePageSize => config.GetValue<int>("AppSettings:ResponsePageSize");
        public int OrderingRowLimit => config.GetValue<int>("AppSettings:OrderingRowLimit");
        public string? ApiVersion => config.GetValue<string>("AppSettings:ApiVersion");
        public int MaxTrendQueryDaySpan => config.GetValue<int>("AppSettings:MaxTrendQueryDaySpan");

        private ConfigurationManager config;
        public AppConfig(ConfigurationManager config)
        {
            this.config = config;
        }
    }
}
