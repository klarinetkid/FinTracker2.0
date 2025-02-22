using FinTracker.Api.Common;
using FinTracker.Services.Data.Entities;
using System.ComponentModel.DataAnnotations;

namespace FinTracker.Api.Models
{
    public class CategoryViewModel
    {
        [Required]
        [MaxLength(40, ErrorMessage = Strings.ErrorMaxLength)]
        [Display(Name = "Category Name")]
        public string? CategoryName { get; set; }

        [Required]
        [MaxLength(25, ErrorMessage = Strings.ErrorMaxLength)]
        public string? Colour { get; set; }

        public TblCategory ToTblCategory(int id = 0)
        {
            return new TblCategory()
            {
                Id = id,
                CategoryName = CategoryName,
                Colour = Colour
            };
        }
    }
}
