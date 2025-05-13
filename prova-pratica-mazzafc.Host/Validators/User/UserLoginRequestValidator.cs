using FluentValidation;
using prova_pratica_mazzafc.Models.Request.User;

namespace prova_pratica_mazzafc.Server.Validators.User
{
    public class UserLoginRequestValidator : AbstractValidator<UserLoginRequest>
    {
        public UserLoginRequestValidator()
        {
            RuleFor(x => x.Email)
            .NotEmpty().WithMessage("O campo Email é obrigatório.")
           .EmailAddress().WithMessage("Formato do Email está inválido.");

            RuleFor(x => x.Password)
           .NotEmpty().WithMessage("O campo Senha é obrigatório.");
        }
    }
}
