using Microsoft.EntityFrameworkCore;
using prova_pratica_mazzafc.Repository;
using prova_pratica_mazzafc.Repository.Interfaces.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;

namespace prova_pratica_mazzafc.Util.ExtensionsMethods
{
    public static class DbContextExtensions
    {
        public static void Insert<T>(this SqlContext context, T entity, int userId) where T : class
        {
            if (entity is IAuditable auditable)
            {
                auditable.CreatedOn = DateTime.Now;
                auditable.CreatedUser = userId;
            }

            context.Set<T>().Add(entity);
            context.SaveChanges();
        }

        public static void Update<T>(this SqlContext context, T entity, int userId) where T : class
        {
            if (entity is IAuditable auditable)
            {
                auditable.ModifyOn = DateTime.Now;
                auditable.ModifyUser = userId;
            }

            context.Entry(entity).State = EntityState.Modified;
            context.SaveChanges();
        }

        public static void SoftDelete<T>(this SqlContext context, T entity, int userId) where T : class
        {
            if (entity is ISoftDeletable deletable)
            {
                deletable.HasDeleted = true;
                deletable.DeletedOn = DateTime.Now;
                deletable.DeletedUser = userId;
                context.Entry(entity).State = EntityState.Modified;
            }

            context.SaveChanges();
        }

        public static T? GetByIdentifier<T>(this SqlContext context, Guid identifier) where T : class, IEntity
        {
            return context.Set<T>().FirstOrDefault(e => e.Identifier == identifier);
        }

        public static T? GetByIdentifier<T>(
            this SqlContext context,
            Guid identifier,
            params Expression<Func<T, object>>[] includes
            ) where T : class, IEntity
        {
            IQueryable<T> query = context.Set<T>();
            
            if (includes != null)
            {
                foreach (var include in includes)
                {
                    query = query.Include(include);
                }
            }

            return query.FirstOrDefault(e => e.Identifier == identifier);
        }


        public static T? GetById<T>(this SqlContext context, int id) where T : class, IEntity
        {
            return context.Set<T>().FirstOrDefault(e => e.Id == id);
        }
    }

}
