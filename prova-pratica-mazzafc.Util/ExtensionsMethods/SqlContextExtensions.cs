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

        public static T? GetValue<T>(
            this SqlContext context,
            Expression<Func<T, bool>> condition,
            params Expression<Func<T, object>>[] includes
        ) where T : class, ISoftDeletable
        {
            IQueryable<T> query = context.Set<T>();

            if (includes != null)
            {
                foreach (var include in includes)
                {
                    query = query.Include(include);
                }
            }

            Expression<Func<T, bool>> notDeleted = x => !x.HasDeleted;

            var parameter = Expression.Parameter(typeof(T));
            var body = Expression.AndAlso(
                Expression.Invoke(condition, parameter),
                Expression.Invoke(notDeleted, parameter)
            );

            var combined = Expression.Lambda<Func<T, bool>>(body, parameter);

            return query.FirstOrDefault(combined);
        }

        public static List<T> GetValues<T>(
            this SqlContext context,
            Expression<Func<T, bool>> condition,
            params Expression<Func<T, object>>[] includes
        ) where T : class, ISoftDeletable
        {
            IQueryable<T> query = context.Set<T>();

            if (includes != null)
            {
                foreach (var include in includes)
                {
                    query = query.Include(include);
                }
            }

            Expression<Func<T, bool>> notDeleted = x => !x.HasDeleted;

            var parameter = Expression.Parameter(typeof(T));
            var body = Expression.AndAlso(
                Expression.Invoke(condition, parameter),
                Expression.Invoke(notDeleted, parameter)
            );

            var combined = Expression.Lambda<Func<T, bool>>(body, parameter);

            return query.Where(combined).ToList();
        }

        public static T? GetByIdentifier<T>(this SqlContext context, Guid identifier) where T : class, IEntity, ISoftDeletable
        {
            return context.Set<T>().FirstOrDefault(e => e.Identifier == identifier && !e.HasDeleted);
        }

        public static T? GetByIdentifier<T>(
            this SqlContext context,
            Guid identifier,
            params Expression<Func<T, object>>[] includes
            ) where T : class, IEntity, ISoftDeletable
        {
            IQueryable<T> query = context.Set<T>();
            
            if (includes != null)
            {
                foreach (var include in includes)
                {
                    query = query.Include(include);
                }
            }

            return query.FirstOrDefault(e => e.Identifier == identifier && !e.HasDeleted);
        }

        public static T? GetById<T>(this SqlContext context, int id) where T : class, IEntity, ISoftDeletable
        {
            return context.Set<T>().FirstOrDefault(e => e.Id == id && !e.HasDeleted);
        }
    }

}
