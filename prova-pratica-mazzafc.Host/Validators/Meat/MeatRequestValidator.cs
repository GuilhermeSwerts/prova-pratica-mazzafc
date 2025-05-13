using FluentValidation;
using prova_pratica_mazzafc.Models.Request.Meat;

namespace prova_pratica_mazzafc.Server.Validators.Meat
{
    public class MeatRequestValidator : AbstractValidator<MeatRequest>
    {
        public MeatRequestValidator()
        {
            RuleFor(x => x.Description)
           .NotEmpty().WithMessage("O campo Descrição é obrigatório.");

            RuleFor(x => x.Origin)
           .NotEmpty().WithMessage("O campo Origem é obrigatório.");
        }
    }
}
