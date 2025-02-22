namespace FinTracker.Api.Common
{
    public class AppConfig
    {
        public string ConnectionString { get; set; }

        public int ResponsePageSize { get; set; }

        public AppConfig(ConfigurationManager config)
        {
            ConnectionString = config.GetConnectionString("Connection")
                ?? throw new Exception("Connection string not defined");

            ResponsePageSize = config.GetValue<int>("AppSettings:ResponsePageSize");

            if (ResponsePageSize < 1) throw new Exception("ResponsePageSize must be greater than 0");
        }
    }
}
