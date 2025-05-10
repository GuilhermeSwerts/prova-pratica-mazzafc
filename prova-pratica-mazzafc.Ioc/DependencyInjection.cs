using Microsoft.Extensions.DependencyInjection;

namespace prova_pratica_mazzafc.Ioc
{
    public static class DependencyInjection
    {
        public static IServiceCollection RegisterServices(this IServiceCollection services)
        {
            return services;
        }

        public static IServiceCollection RegisterRepositories(this IServiceCollection services)
        {
            return services;
        }
    }
}
