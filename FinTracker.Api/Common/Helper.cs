using FinTracker.Services.Data;
using System.Globalization;
using System.Runtime.CompilerServices;

namespace FinTracker.Api.Common
{
    public class Helper
    {
        public static AppConfig AppConfig
        {
            get
            {
                if (_appConfig == null) throw new Exception("AppConfig is null");
                return _appConfig;
            }
            set
            {
                _appConfig = value;
            }
        }

        private static AppConfig? _appConfig;

        public static string GetDateOrdinalIndication(int day)
        {
            switch (day)
            {
                case 1:
                case 21:
                case 31:
                    return "st";
                case 2:
                case 22:
                    return "nd";
                case 3:
                case 23:
                    return "rd";
                default:
                    return "th";
            }
        }
    }
}
