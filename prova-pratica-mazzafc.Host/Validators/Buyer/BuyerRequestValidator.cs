using FluentValidation;
using prova_pratica_mazzafc.Models.Request.Buyer;
using prova_pratica_mazzafc.Models.Response.Buyer;

namespace prova_pratica_mazzafc.Server.Validators.Buyer
{
    public class BuyerRequestValidator : AbstractValidator<BuyerRequest>
    {
        public BuyerRequestValidator()
        {
            RuleFor(x => x.Name)
            .NotEmpty().WithMessage("O campo Name é obrigatório.");

            RuleFor(x => x.DocNumber)
                .NotEmpty().WithMessage("O campo Número do documento é obrigatório.");

            RuleFor(x => x.State)
                .NotEmpty().WithMessage("O campo Estado do documento é obrigatório.");

            RuleFor(x => x.City)
                .NotEmpty().WithMessage("O campo Cidade do documento é obrigatório.");
        }
    }
}
