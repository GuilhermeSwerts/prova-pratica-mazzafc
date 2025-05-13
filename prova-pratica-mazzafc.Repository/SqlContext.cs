using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using prova_pratica_mazzafc.Repository.Map;

namespace prova_pratica_mazzafc.Repository
{
    public class SqlContext(DbContextOptions<SqlContext> options) : DbContext(options)
    {
        #region [ CONSTRUCTOR ]

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<MeatMap>(entity =>
            {
                entity.HasKey(r => r.Id);
            });

            modelBuilder.Entity<BuyerLocationMap>(entity =>
            {
                entity.HasKey(r => r.Id);

                entity.HasOne(t => t.Buyer)
                     .WithMany(r => r.Locations)
                     .HasForeignKey(r => r.BuyerId)
                     .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<OrderMap>(entity =>
            {
                entity.HasKey(r => r.Id);

                entity.HasOne(t => t.Buyer)
                     .WithMany(r => r.Orders)
                     .HasForeignKey(r => r.BuyerId)
                     .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(t => t.TypeCoin)
                     .WithMany(r => r.Orders)
                     .HasForeignKey(r => r.TypeCoinId)
                     .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<OrderMeatMap>(entity =>
            {
                entity.HasKey(r => r.Id);

                entity.HasOne(t => t.Order)
                     .WithMany(r => r.OrderMeats)
                     .HasForeignKey(r => r.OrderId)
                     .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(t => t.MeatOrigin)
                     .WithMany(r => r.OrderMeats)
                     .HasForeignKey(r => r.MeatOriginId)
                     .OnDelete(DeleteBehavior.Cascade);
            });


            modelBuilder.Entity<MeatOriginMap>(entity =>
            {
                entity.HasKey(r => r.Id);

                entity.HasOne(t => t.Origin)
                     .WithMany(r => r.MeatsOrigins)
                     .HasForeignKey(r => r.OriginId)
                     .OnDelete(DeleteBehavior.Cascade);
                
                entity.HasOne(t => t.Meat)
                      .WithMany(r => r.MeatsOrigins)
                      .HasForeignKey(r => r.MeatId)
                      .OnDelete(DeleteBehavior.Cascade);
            });


        }

        #endregion

        #region [ PROPERTIES ] 

        public DbSet<OriginMap> Origins { get; set; }
        public DbSet<TypeCoinMap> TypesCoins { get; set; }
        public DbSet<UserMap> Users { get; set; }
        public DbSet<OrderMap> Orders { get; set; }
        public DbSet<MeatMap> Meats { get; set; }
        public DbSet<BuyerMap> Buyers { get; set; }

        public DbSet<MeatOriginMap> MeatsOrigins { get; set; }
        public DbSet<OrderMeatMap> OrderMeats { get; set; }
        public DbSet<BuyerLocationMap> BuyerLocations { get; set; }

        public DbSet<LogError> LogError { get; set; }

        #endregion

        #region PUBLIC METHODS

        public static SqlContext GetContextConnection()
        {
            var configuration = new ConfigurationBuilder()
            .SetBasePath(AppContext.BaseDirectory)
            .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
            .Build();

            var options = new DbContextOptionsBuilder<SqlContext>()
                .UseSqlServer(configuration.GetConnectionString("SqlServerConnection"))
                .Options;

            return new SqlContext(options);
        }

        #endregion
    }
}
