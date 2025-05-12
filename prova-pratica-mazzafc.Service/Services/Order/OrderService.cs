using prova_pratica_mazzafc.Models.Response.Meat;
using prova_pratica_mazzafc.Models.Response;
using prova_pratica_mazzafc.Repository.Map;
using prova_pratica_mazzafc.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using prova_pratica_mazzafc.Models.Response.Order;
using prova_pratica_mazzafc.Service.Interfaces.Order;
using prova_pratica_mazzafc.Models.Request.Order;
using prova_pratica_mazzafc.Util.ExtensionsMethods;
using Microsoft.EntityFrameworkCore;
using prova_pratica_mazzafc.Models.Request.Filter;
using prova_pratica_mazzafc.Util.Filter;

namespace prova_pratica_mazzafc.Service.Services.Order
{
    public class OrderService(SqlContext _sqlContext) : IOrderService
    {
        public ApiResponse<List<OrderDto>> AllOrders(List<FilterRequest> filters)
        {
            try
            {
                var orders = _sqlContext.Orders
                    .Include(o => o.TypeCoin)
                    .Include(o => o.OrderMeats)
                    .ThenInclude(om => om.MeatOrigin)
                    .ThenInclude(mo => mo.Meat)
                    .Include(o => o.OrderMeats)
                    .ThenInclude(om => om.MeatOrigin)
                    .ThenInclude(mo => mo.Origin)
                    .Where(x => !x.HasDeleted)
                    .Select(order => new OrderDto
                    {
                        Identifier = order.Identifier.ToString(),
                        BuyerId = order.BuyerId,
                        TypeCoin = order.TypeCoin.Name,
                        DtRegister = order.CreatedOn.ToString("dd/MM/yyyy hh:mm:ss"),
                        Meats = order.OrderMeats
                            .Where(x => !x.HasDeleted)
                            .Select(om => new MeatDto
                            {
                                Identifier = om.MeatOrigin.Identifier.ToString(),
                                Name = om.MeatOrigin.Meat.Description,
                                Origin = om.MeatOrigin.Origin.Description,
                                DtRegister = om.CreatedOn.ToString("dd/MM/yyyy hh:mm:ss"),
                                OriginId = om.MeatOrigin.OriginId,
                            })
                            .ToList()
                    })
                    .ToList();

                if (filters.Count > 0)
                {
                    var filter = FilterUtil.GetFiltro<OrderDto>(filters).Compile();
                    orders = orders.Where(filter).ToList();
                }

                return new ApiResponse<List<OrderDto>>
                {
                    RequestSuccess = true,
                    ResponseData = orders
                };
            }
            catch (Exception ex)
            {
                return new ApiResponse<List<OrderDto>>
                {
                    RequestSuccess = false,
                    Erro = new ApiErro
                    {
                        Exception = ex.Message,
                        Message = "Erro ao buscar pedidos"
                    },
                    ResponseData = []
                };
            }
        }

        public ApiResponse<bool> NewOrder(OrderRequest request, int userId)
        {
            using var tran = _sqlContext.Database.BeginTransaction();
            try
            {
                var order = new OrderMap
                {
                    BuyerId = request.BuyerId,
                    TypeCoinId = request.TypeCoinId
                };

                _sqlContext.Insert(order, userId);

                foreach (var meatId in request.MeatOriginIds)
                {
                    var orderMeat = new OrderMeatMap
                    {
                        OrderId = order.Id,
                        MeatOriginId = meatId
                    };
                    _sqlContext.Insert(orderMeat, userId);
                }

                tran.Commit();
                return new ApiResponse<bool>
                {
                    RequestSuccess = true,
                    ResponseData = true
                };
            }
            catch (Exception ex)
            {
                tran.Rollback();
                return new ApiResponse<bool>
                {
                    RequestSuccess = false,
                    Erro = new ApiErro
                    {
                        Exception = ex.Message,
                        Message = "Erro ao criar novo pedido"
                    },
                    ResponseData = false
                };
            }
        }

        public ApiResponse<OrderDto> OrderByIdentifier(Guid identifier)
        {
            try
            {
                var order = _sqlContext.GetByIdentifier<OrderMap>(identifier,
                    o => o.TypeCoin,
                    o => o.OrderMeats,
                    o => o.OrderMeats.Select(om => om.MeatOrigin),
                    o => o.OrderMeats.Select(om => om.MeatOrigin.Meat),
                    o => o.OrderMeats.Select(om => om.MeatOrigin.Origin));

                var dto = new OrderDto
                {
                    Identifier = order.Identifier.ToString(),
                    BuyerId = order.BuyerId,
                    TypeCoin = order.TypeCoin.Name,
                    DtRegister = order.CreatedOn.ToString("dd/MM/yyyy hh:mm:ss"),
                    Meats = order.OrderMeats
                        .Where(x => !x.HasDeleted)
                        .Select(om => new MeatDto
                        {
                            Identifier = om.MeatOrigin.Identifier.ToString(),
                            Name = om.MeatOrigin.Meat.Description,
                            Origin = om.MeatOrigin.Origin.Description,
                            DtRegister = om.CreatedOn.ToString("dd/MM/yyyy hh:mm:ss"),
                            OriginId = om.MeatOrigin.OriginId,
                        }).ToList()
                };

                return new ApiResponse<OrderDto>
                {
                    RequestSuccess = true,
                    ResponseData = dto
                };
            }
            catch (Exception ex)
            {
                return new ApiResponse<OrderDto>
                {
                    RequestSuccess = false,
                    Erro = new ApiErro
                    {
                        Exception = ex.Message,
                        Message = "Erro ao buscar pedido"
                    },
                    ResponseData = new()
                };
            }
        }

        public ApiResponse<bool> ModifyOrder(OrderRequest request, int userId)
        {
            using var tran = _sqlContext.Database.BeginTransaction();
            try
            {
                var order = _sqlContext
                    .Orders
                    .Include(x => x.OrderMeats)
                    .First(x => x.Identifier == request.Identifier.Value && !x.HasDeleted);

                order.BuyerId = request.BuyerId;
                order.TypeCoinId = request.TypeCoinId;
                _sqlContext.Update(order, userId);

                var existingMeats = order.OrderMeats.Where(x => !x.HasDeleted).ToList();
                foreach (var item in existingMeats)
                {
                    _sqlContext.SoftDelete(item, userId);
                }

                foreach (var meatOriginId in request.MeatOriginIds)
                {
                    var newOrderMeat = new OrderMeatMap
                    {
                        OrderId = order.Id,
                        MeatOriginId = meatOriginId
                    };
                    _sqlContext.Insert(newOrderMeat, userId);
                }

                tran.Commit();
                return new ApiResponse<bool>
                {
                    RequestSuccess = true,
                    ResponseData = true
                };
            }
            catch (Exception ex)
            {
                tran.Rollback();
                return new ApiResponse<bool>
                {
                    RequestSuccess = false,
                    Erro = new ApiErro
                    {
                        Exception = ex.Message,
                        Message = "Erro ao atualizar o pedido."
                    },
                    ResponseData = false
                };
            }
        }

        public ApiResponse<bool> DeleteOrder(Guid identifier, int userId)
        {
            using var tran = _sqlContext.Database.BeginTransaction();
            try
            {
                var order = _sqlContext.GetByIdentifier<OrderMap>(identifier, o => o.OrderMeats);

                foreach (var om in order.OrderMeats.Where(x => !x.HasDeleted))
                {
                    _sqlContext.SoftDelete(om, userId);
                }

                _sqlContext.SoftDelete(order, userId);
                tran.Commit();

                return new ApiResponse<bool>
                {
                    RequestSuccess = true,
                    ResponseData = true
                };
            }
            catch (Exception ex)
            {
                tran.Rollback();
                return new ApiResponse<bool>
                {
                    RequestSuccess = false,
                    Erro = new ApiErro
                    {
                        Exception = ex.Message,
                        Message = "Erro ao excluir pedido"
                    },
                    ResponseData = false
                };
            }
        }
    }

}
