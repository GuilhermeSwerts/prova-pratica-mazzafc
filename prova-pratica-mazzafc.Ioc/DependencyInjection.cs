using Microsoft.Extensions.DependencyInjection;
using prova_pratica_mazzafc.Service.Interfaces.Meat;
using prova_pratica_mazzafc.Service.Services.Meat;

namespace prova_pratica_mazzafc.Ioc
{
    public static class DependencyInjection
    {
        public static IServiceCollection RegisterServices(this IServiceCollection services)
        {
            services.AddScoped<IMeatService, MeatService>();

            return services;
        }

        public static IServiceCollection RegisterRepositories(this IServiceCollection services)
        {
            return services;
        }
    }
}
