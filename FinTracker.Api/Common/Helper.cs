﻿using FinTracker.Services.Data;
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
        
        public static int GetWholeYearDiff(DateOnly start, DateOnly end)
        {
            int years = end.Year - start.Year;
            if (end < new DateOnly(end.Year, start.Month, start.Day)) years--;
            return years;
        }

        public static int GetMonthDiff(DateOnly start, DateOnly end, bool addYears)
        {
            int months = end.Month - start.Month;
            if (start.Day > end.Day) months--;
            if (months < 0) months += 12;

            if (addYears) months += GetWholeYearDiff(start, end) * 12;

            return months;
        }

        public static string GetTimeSpanValues(DateOnly start, DateOnly end)
        {
            int years = GetWholeYearDiff(start, end);
            int months = GetMonthDiff(start, end, false);

            // if days is negative, add days in start month to wrap around month
            int days = end.Day - start.Day; // - 1;
            if (days < 0) days += DateTime.DaysInMonth(start.Year, start.Month);

            string[] values = [
                years > 0 ? years + " year" + Pluralize(years) : "",
                months > 0 ? months + " month" + Pluralize(months) : "",
                days > 0 ? days + " day" + Pluralize(days) : "",
            ];

            values = values.Where(s => !string.IsNullOrEmpty(s)).ToArray();

            if (values.Length >= 2)
                values[values.Length - 1] = "and " + values[values.Length - 1];

            return string.Join(values.Length == 2 ? " " : ", ", values);
        }

        public static string Pluralize(int value)
        {
            return value != 1 ? "s" : "";
        }
    }
}
