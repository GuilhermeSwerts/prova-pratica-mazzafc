using Microsoft.Extensions.DependencyInjection;
using prova_pratica_mazzafc.Service.Interfaces.Buyer;
using prova_pratica_mazzafc.Service.Interfaces.Coin;
using prova_pratica_mazzafc.Service.Interfaces.Meat;
using prova_pratica_mazzafc.Service.Interfaces.Order;
using prova_pratica_mazzafc.Service.Interfaces.Origin;
using prova_pratica_mazzafc.Service.Interfaces.User;
using prova_pratica_mazzafc.Service.Services.Buyer;
using prova_pratica_mazzafc.Service.Services.Coin;
using prova_pratica_mazzafc.Service.Services.Meat;
using prova_pratica_mazzafc.Service.Services.Order;
using prova_pratica_mazzafc.Service.Services.Origin;
using prova_pratica_mazzafc.Service.Services.User;

namespace prova_pratica_mazzafc.Ioc
{
    public static class DependencyInjection
    {
        public static IServiceCollection RegisterServices(this IServiceCollection services)
        {
            services.AddScoped<IMeatService, MeatService>();
            services.AddScoped<IBuyerService, BuyerService>();
            services.AddScoped<IOrderService, OrderService>();
            services.AddScoped<IOriginService, OriginService>();
            services.AddScoped<ICoinService, CoinService>();
            services.AddScoped<IUserService, UserService>();
            
            return services;
        }
    }
}
