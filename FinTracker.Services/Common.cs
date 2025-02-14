using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FinTracker.Services.Data.Entities;

namespace FinTracker.Services
{
    public class CategoryTotal
    {
        public int Total { get; set; }
        public float PercentOfIncome { get; set; }
        public DateOnly Date { get; set; }
        public TblCategory? Category { get; set; }
    }

    public class InOutValues
    {
        public int ValueIn { get; set; }
        public int ValueOut { get; set; }
        public int ValueDiff
        {
            get
            {
                return ValueIn - ValueOut;
            }
        }
        public InOutValues(int valueIn, int valueOut)
        {
            ValueIn = valueIn;
            ValueOut = valueOut;
        }

    }
}
