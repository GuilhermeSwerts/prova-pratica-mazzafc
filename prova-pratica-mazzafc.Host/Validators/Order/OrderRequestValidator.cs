using FluentValidation;
using prova_pratica_mazzafc.Models.Request.Order;

namespace prova_pratica_mazzafc.Server.Validators.Order
{
    public class OrderRequestValidator : AbstractValidator<OrderRequest>
    {
        public OrderRequestValidator()
        {
            RuleFor(x => x.BuyerId)
           .NotEmpty().WithMessage("O campo Id do comprador é obrigatório.");

            RuleFor(x => x.TypeCoinId)
           .NotEmpty().WithMessage("O campo Id da Moeda é obrigatório.");

            RuleFor(x => x.MeatOrigins)
           .NotEmpty().WithMessage("O campo Id da Moeda é obrigatório.");

            RuleFor(x => x.MeatOrigins)
                .NotNull().WithMessage("A lista MeatOrigins não pode ser nula")
                .NotEmpty().WithMessage("A lista MeatOrigins não pode ser vazia");

            RuleForEach(x => x.MeatOrigins)
                .SetValidator(new OrderMeatOriginRequestValidator());
        }
    }
}

