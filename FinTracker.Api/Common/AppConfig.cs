namespace FinTracker.Api.Common
{
    public class AppConfig
    {
        public string ConnectionString { get; set; }

        public AppConfig(ConfigurationManager config)
        {
            ConnectionString = config.GetConnectionString("Connection")
                ?? throw new Exception("Connection string not defined");
        }
    }
}
