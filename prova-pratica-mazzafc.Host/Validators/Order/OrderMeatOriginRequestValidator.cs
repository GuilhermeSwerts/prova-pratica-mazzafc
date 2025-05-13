using FluentValidation;
using prova_pratica_mazzafc.Models.Request.Order;

namespace prova_pratica_mazzafc.Server.Validators.Order
{
    public class OrderMeatOriginRequestValidator : AbstractValidator<OrderMeatOriginRequest>
    {
        public OrderMeatOriginRequestValidator()
        {
            RuleFor(x => x.Id)
                .GreaterThan(0).WithMessage("O campo Id da carne é obrigatório.");

            RuleFor(x => x.Quantity)
                .GreaterThan(0).WithMessage("O campo Quantidade é obrigatório.");

            RuleFor(x => x.Price)
                .GreaterThanOrEqualTo(0).WithMessage("O campo Preço é obrigatório.");

        }
    }
}
