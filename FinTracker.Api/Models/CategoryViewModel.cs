﻿using FinTracker.Api.Common;
using FinTracker.Services.Data.Entities;
using System.ComponentModel.DataAnnotations;

namespace FinTracker.Api.Models
{
    public class CategoryViewModel : IEntityViewModel<TblCategory>
    {
        [Required]
        [MaxLength(40, ErrorMessage = Strings.ErrorMaxLength)]
        [Display(Name = "Category Name")]
        public string? CategoryName { get; set; }

        [Required]
        [MaxLength(25, ErrorMessage = Strings.ErrorMaxLength)]
        public string? Colour { get; set; }

        public TblCategory ToTblEntity(int id = 0)
        {
            return new TblCategory()
            {
                Id = id,
                CategoryName = CategoryName ?? throw new Exception("CategoryName is required"),
                Colour = Colour ?? throw new Exception("Colour is required")
            };
        }
    }
}
