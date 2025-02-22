using FinTracker.Api.Common;
using FinTracker.Api.Services;
using System.ComponentModel.DataAnnotations;

namespace FinTracker.Api.Validation
{
    public class CategoryIdAttribute : BaseValidationAttribute<int>
    {
        public override string GetErrorMessage() => Strings.ErrorCategoryNotFound;

        public override ValidationResult? ValidatePropertyValue(int value)
        {
            return new CategoryService().GetCategory(value) != null
                ? ValidationResult.Success
                : new ValidationResult(GetErrorMessage());
        }
    }
}
