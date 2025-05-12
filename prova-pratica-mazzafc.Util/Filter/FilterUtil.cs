using prova_pratica_mazzafc.Models.Request.Filter;
using prova_pratica_mazzafc.Util.ExtensionsMethods;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;
using static prova_pratica_mazzafc.Models.Enums.FilterEnum;

namespace prova_pratica_mazzafc.Util.Filter
{
    public static class FilterUtil
    {
        private static Expression<Func<T, bool>> CombineFiltersWithAnd<T>(IEnumerable<Expression<Func<T, bool>>> filters)
        {
            var parameter = Expression.Parameter(typeof(T), "x");
            Expression body = null;

            foreach (var filter in filters)
            {
                var replaced = new ReplaceParameterVisitor(filter.Parameters[0], parameter).Visit(filter.Body);
                body = body == null ? replaced : Expression.AndAlso(body, replaced);
            }

            return body != null ? Expression.Lambda<Func<T, bool>>(body, parameter) : x => true;
        }

        private class ReplaceParameterVisitor : ExpressionVisitor
        {
            private readonly ParameterExpression _oldParameter;
            private readonly ParameterExpression _newParameter;

            public ReplaceParameterVisitor(ParameterExpression oldParameter, ParameterExpression newParameter)
            {
                _oldParameter = oldParameter;
                _newParameter = newParameter;
            }

            protected override Expression VisitParameter(ParameterExpression node)
            {
                return node == _oldParameter ? _newParameter : base.VisitParameter(node);
            }
        }

        private static List<Expression<Func<T, bool>>> OrganizeFilter<T>(List<FilterRequest> filters)
        {
            var list = new List<Expression<Func<T, bool>>>();
            foreach (var filter in filters)
            {
                var parameter = Expression.Parameter(typeof(T), "x");
                var property = Expression.Property(parameter, filter.FieldKey);
                var constant = Expression.Constant(Convert.ChangeType(filter.Comparison, property.Type));

                Expression comparison;
                if (filter.Condition == EFilterCondition.Equals.GetDescription())
                    comparison = Expression.Equal(property, constant);
                else if (filter.Condition == EFilterCondition.Greater_Than.GetDescription())
                    comparison = Expression.GreaterThan(property, constant);
                else if (filter.Condition == EFilterCondition.Less_Than.GetDescription())
                    comparison = Expression.LessThan(property, constant);
                else if (filter.Condition == EFilterCondition.Greater_Than_Or_Equal_To.GetDescription())
                    comparison = Expression.GreaterThanOrEqual(property, constant);
                else if (filter.Condition == EFilterCondition.Less_Than_Or_Equal_To.GetDescription())
                    comparison = Expression.LessThanOrEqual(property, constant);
                else
                    throw new NotSupportedException($"Condição de filtro não suportada: {filter.Condition}");

                var lambda = Expression.Lambda<Func<T, bool>>(comparison, parameter);
                list.Add(lambda);
            }

            return list;
        }

        public static Expression<Func<T, bool>> GetFiltro<T>(List<FilterRequest> filters)
        {
            try
            {
                var meatFilters = OrganizeFilter<T>(filters);
                Expression<Func<T, bool>> meatFilterExpression = CombineFiltersWithAnd(meatFilters);

                return meatFilterExpression;
            }
            catch (Exception)
            {
                throw;
            }   
        }
    }
}
