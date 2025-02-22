using Microsoft.Extensions.Options;
using System.ComponentModel.DataAnnotations;
using System.Reflection;

namespace FinTracker.Api.Validation
{
    public class BaseValidationAttribute<T> : ValidationAttribute
    {
        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            PropertyInfo? property = validationContext.ObjectType.GetProperty(validationContext.MemberName);
            if (property != null)
            {
                object? propertyValue = property.GetValue(validationContext.ObjectInstance, null);

                if (propertyValue is T)
                    return ValidatePropertyValue((T)propertyValue);
            }

            // no issue if empty value
            return ValidationResult.Success;
        }

        public virtual string GetErrorMessage()
        {
            throw new NotImplementedException();
        }

        public virtual ValidationResult? ValidatePropertyValue(T value)
        {
            throw new NotImplementedException();
        }
    }
}
