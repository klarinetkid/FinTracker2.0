using FinTracker.Api.Common;
using System.ComponentModel.DataAnnotations;
using System.Reflection;

namespace FinTracker.Api.Validation
{
    public class DateOnlyAttribute : BaseValidationAttribute<string>
    {
        public override string GetErrorMessage() => Strings.ErrorInvalidDate;

        public override ValidationResult? ValidatePropertyValue(string value)
        {
            if (DateOnly.TryParse(value, out var _))
                return ValidationResult.Success;

            return new ValidationResult(GetErrorMessage());
        }
    }
}
