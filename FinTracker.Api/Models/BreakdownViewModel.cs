﻿using FinTracker.Api.Common;
using FinTracker.Services.Data.Entities;
using System.ComponentModel;
using System.Globalization;

namespace FinTracker.Api.Models
{
    public class BreakdownViewModel
    {
        public DateOnly Start { get; private init; }
        public DateOnly End { get; private init; }

        public CategoryTotal[] CategoryTotals { get; private init; }

        public Int64 TotalIn { get; private init; }
        public Int64 TotalOut { get; private init; }

        public bool IsEmpty
        {
            get
            {
                return !CategoryTotals.Any();
            }
        }

        public string Type
        {
            get
            {
                if (Start.AddDays(1) == End)
                    return "Day";

                // if spans one week and start lines up with week from start of year
                int weekNum = ISOWeek.GetWeekOfYear(Start.ToDateTime());
                int weekYear = ISOWeek.GetYear(Start.ToDateTime());
                DateOnly firstDayOfWeek = DateOnly.FromDateTime(ISOWeek.GetYearStart(weekYear)).AddDays((weekNum-1) * 7); // Helper.FirstDateOfWeekISO8601(weekYear, weekNum);
                if (Start.AddDays(7) == End && Start == firstDayOfWeek)
                    return "Week";

                if (Start.Day == 1)
                {
                    // whole month
                    if (Start.AddMonths(1) == End)
                        return "Month";

                    // whole year
                    if (Start.AddYears(1) == End)
                        return "Year";

                    if (End.Day == 1)
                    {
                        // different months in same year
                        if (Start.Year == End.Year)
                            return "MultiMonth";

                        // different months in different years
                        if (Start.Month == 1 && End.Month == 1)
                            return "MultiYear";

                        return "MultiYearMonth";
                    }
                }
                
                return "";
            }
        }

        public string Title
        {
            get
            {
                switch (Type)
                {
                    case "Day":
                        return Start.ToString($"MMMM d'{Helper.GetDateOrdinalIndication(Start.Day)}' yyyy");
                    case "Week":
                        return Start.ToString("yyyy") + " Week " + ISOWeek.GetWeekOfYear(Start.ToDateTime());
                    case "Month":
                        return Start.ToString("MMMM yyyy");
                    case "Year":
                        return "Year " + Start.ToString("yyyy");
                    case "MultiMonth":
                        return Start.ToString("MMMM") + " - " + End.AddDays(-1).ToString("MMMM yyyy");
                    case "MultiYear":
                        return "Years " + Start.ToString("yyyy") + " - " + End.AddDays(-1).ToString("yyyy");
                    case "MultiYearMonth":
                        return Start.ToString("MMMM yyyy") + " - " + End.AddDays(-1).ToString("MMMM yyyy");
                }

                return Start.ToString("MMM d") +
                    Helper.GetDateOrdinalIndication(Start.Day) +
                    (Start.Year != End.Year ? " " + Start.Year : "") +
                    " - " + 
                    End.AddDays(-1).ToString("MMM d") +
                    Helper.GetDateOrdinalIndication(End.AddDays(-1).Day)
                    + " " + End.AddDays(-1).Year;
            }
        }

        public string Subtitle
        {
            get
            {
                TimeSpan Diff = (End.ToDateTime() - Start.ToDateTime());
                switch (Type)
                {
                    case "Week":
                        return Start.ToString("dddd, MMMM d") + 
                            Helper.GetDateOrdinalIndication(Start.Day) + 
                            " - " + 
                            End.AddDays(-1).ToString("dddd, MMMM d") +
                            Helper.GetDateOrdinalIndication(End.AddDays(-1).Day);
                    case "Month":
                    case "Year":
                        return "";
                    case "MultiMonth":
                    case "MultiYearMonth":
                        return Helper.GetMonthDiff(Start, End, true) + " months";
                    case "MultiYear":
                        return (Diff.Days / 365) + " years";
                }

                return Helper.GetTimeSpanValues(Start, End);
            }
        }

        public BreakdownViewModel(DateOnly start, DateOnly end, IEnumerable<TblTransaction> transactions, CategoryTotal[] categoryTotals)
        {
            Start = start;
            End = end;
            CategoryTotals = categoryTotals;
            TotalIn = transactions.Where(t => t.Amount > 0).Sum(t => (Int64)t.Amount);
            TotalOut = transactions.Where(t => t.Amount < 0).Sum(t => (Int64)t.Amount);
        }
    }
}