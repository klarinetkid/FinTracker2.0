using FinTracker.Services.Data;
using FinTracker.Services.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace FinTracker.Api.Models
{
    public class BaseViewModel
    {
        // TODO: config
        //internal ApplicationDbContext db = new("C:\\Users\\zmoze\\OneDrive\\vault\\code\\fintracker\\_db\\fintracker.db");
        internal ApplicationDbContext db = new("C:\\Users\\zmoze\\OneDrive\\vault\\code\\fintracker\\_dev_db\\fintracker_dev.sqlite3");
    }
}
