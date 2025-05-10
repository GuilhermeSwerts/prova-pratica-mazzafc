using Microsoft.EntityFrameworkCore;
using prova_pratica_mazzafc.Repository.Map;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace prova_pratica_mazzafc.Repository
{
    public class SqlContext(DbContextOptions<SqlContext> options) : DbContext(options)
    {
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<MeatMap>(entity =>
            {
                entity.HasKey(r => r.Id);

                entity.HasOne(t => t.Origin)
                     .WithMany(r => r.Meats)
                     .HasForeignKey(r => r.OriginId)
                     .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<BuyerLocationMap>(entity =>
            {
                entity.HasKey(r => r.Id);

                entity.HasOne(t => t.Buyer)
                     .WithMany(r => r.Locations)
                     .HasForeignKey(r => r.BuyerId)
                     .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<Order>(entity =>
            {
                entity.HasKey(r => r.Id);

                entity.HasOne(t => t.TypeCoin)
                     .WithMany(r => r.Orders)
                     .HasForeignKey(r => r.TypeCoinId)
                     .OnDelete(DeleteBehavior.Cascade);
            });


            modelBuilder.Entity<OrderMeat>(entity =>
            {
                entity.HasKey(r => r.Id);

                entity.HasOne(t => t.Order)
                     .WithMany(r => r.OrderMeats)
                     .HasForeignKey(r => r.OrderId)
                     .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(t => t.Meat)
                     .WithMany(r => r.OrderMeats)
                     .HasForeignKey(r => r.OrderId)
                     .OnDelete(DeleteBehavior.Cascade);
            });
        }

        public DbSet<OriginMap> Origins { get; set; }
        public DbSet<TypeCoinMap> TypesCoins { get; set; }
        
        public DbSet<Order> Orders { get; set; }
        public DbSet<MeatMap> Meats { get; set; }
        public DbSet<BuyerMap> Buyers { get; set; }
        
        public DbSet<OrderMeat> OrderMeats { get; set; }
        public DbSet<BuyerLocationMap> BuyerLocations { get; set; }

        public DbSet<LogError> LogError { get; set; }
    }
}
