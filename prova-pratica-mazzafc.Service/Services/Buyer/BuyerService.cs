using prova_pratica_mazzafc.Models.Response;
using prova_pratica_mazzafc.Repository.Map;
using prova_pratica_mazzafc.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using prova_pratica_mazzafc.Service.Interfaces.Buyer;
using prova_pratica_mazzafc.Models.Response.Buyer;
using prova_pratica_mazzafc.Models.Request.Buyer;
using prova_pratica_mazzafc.Util.ExtensionsMethods;
using Microsoft.EntityFrameworkCore;
using prova_pratica_mazzafc.Models.Request.Filter;
using prova_pratica_mazzafc.Models.Response.Meat;
using prova_pratica_mazzafc.Util.Filter;

namespace prova_pratica_mazzafc.Service.Services.Buyer
{
    public class BuyerService(SqlContext _sqlContext) : IBuyerService
    {
        public ApiResponse<List<BuyerDto>> AllBuyers(List<FilterRequest> filters)
        {
            try
            {
                var buyers = _sqlContext.Buyers
                    .Include(x => x.Locations)
                    .Where(x => !x.HasDeleted)
                    .Select(x => new BuyerDto
                    {
                        Id =x.Id,
                        Identifier = x.Identifier.ToString(),
                        Name = x.Name,
                        DocNumber = x.DocNumber,
                        DtRegister = x.CreatedOn.ToString("dd/MM/yyyy hh:mm:ss"),
                        State = x.Locations.First().State,
                        City = x.Locations.First().City,
                        CreatedOn = DateTime.Parse(x.CreatedOn.ToString("yyyy-MM-dd")),
                    })
                    .ToList();

                if (filters.Count > 0)
                {
                    var filter = FilterUtil.GetFiltro<BuyerDto>(filters).Compile();
                    buyers = buyers.Where(filter).ToList();
                }

                return new ApiResponse<List<BuyerDto>>
                {
                    RequestSuccess = true,
                    ResponseData = buyers
                };
            }
            catch (Exception ex)
            {
                return new ApiResponse<List<BuyerDto>>
                {
                    RequestSuccess = false,
                    Erro = new ApiErro
                    {
                        Exception = ex.Message,
                        Message = "Houve um erro ao buscar todos os compradores"
                    },
                    ResponseData = []
                };
            }
        }

        public ApiResponse<bool> NewBuyer(BuyerRequest request, int userId)
        {
            using var tran = _sqlContext.Database.BeginTransaction();
            try
            {
                if (_sqlContext.Buyers.Any(x => x.DocNumber == request.DocNumber && !x.HasDeleted))
                {
                    return new ApiResponse<bool>
                    {
                        RequestSuccess = false,
                        Erro = new ApiErro
                        {
                            Message = "Já existe um comprador com este documento"
                        },
                        ResponseData = false
                    };
                }

                var buyer = new BuyerMap
                {
                    Name = request.Name,
                    DocNumber = request.DocNumber,
                };

                _sqlContext.Insert(buyer, userId);

                var locations =
                        new BuyerLocationMap
                        {
                            BuyerId = buyer.Id,
                            State = request.State,
                            City = request.City,
                        };

                _sqlContext.Insert(locations, userId);
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
                        Message = "Houve um erro ao criar um novo comprador"
                    },
                    ResponseData = false
                };
            }
        }

        public ApiResponse<BuyerDto> BuyerByIdentifier(Guid identifier)
        {
            try
            {
                var buyer = _sqlContext.GetByIdentifier<BuyerMap>(identifier, x => x.Locations);

                if (buyer == null)
                {
                    return new ApiResponse<BuyerDto>
                    {
                        RequestSuccess = false,
                        Erro = new ApiErro
                        {
                            Exception = "Comprador não encontrado",
                            Message = "Comprador não encontrado"
                        },
                        ResponseData = new()
                    };
                }

                return new ApiResponse<BuyerDto>
                {
                    RequestSuccess = true,
                    ResponseData = new BuyerDto
                    {
                        Id = buyer.Id,
                        Identifier = buyer.Identifier.ToString(),
                        Name = buyer.Name,
                        DocNumber = buyer.DocNumber,
                        DtRegister = buyer.CreatedOn.ToString("dd/MM/yyyy hh:mm:ss"),
                        State = buyer.Locations.First().State,
                        City = buyer.Locations.First().City
                    }
                };
            }
            catch (Exception ex)
            {
                return new ApiResponse<BuyerDto>
                {
                    RequestSuccess = false,
                    Erro = new ApiErro
                    {
                        Exception = ex.Message,
                        Message = "Houve um erro ao buscar o comprador"
                    },
                    ResponseData = new()
                };
            }
        }

        public ApiResponse<bool> ModifyBuyer(BuyerRequest request, int userId)
        {
            using var tran = _sqlContext.Database.BeginTransaction();
            try
            {
                var buyer = _sqlContext.GetByIdentifier<BuyerMap>(request.Identifier.Value);

                if (buyer == null)
                {
                    return new ApiResponse<bool>
                    {
                        RequestSuccess = false,
                        Erro = new ApiErro
                        {
                            Exception = "Comprador não encontrado",
                            Message = "Comprador não encontrado"
                        },
                        ResponseData = false
                    };
                }

                buyer.Name = request.Name;
                buyer.DocNumber = request.DocNumber;
                _sqlContext.Update(buyer, userId);

                var locations = _sqlContext.GetValue<BuyerLocationMap>(x => x.BuyerId == buyer.Id);
                if (locations != null)
                {
                    locations.State = request.State;
                    locations.City = request.City;
                    _sqlContext.Update(locations, userId);
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
                        Message = "Houve um erro ao atualizar o comprador"
                    },
                    ResponseData = false
                };
            }
        }

        public ApiResponse<bool> DeleteBuyer(Guid identifier, int userId)
        {
            using var tran = _sqlContext.Database.BeginTransaction();
            try
            {
                var buyer = _sqlContext.GetByIdentifier<BuyerMap>(identifier);
                var locations = _sqlContext.GetValue<BuyerLocationMap>(x => x.BuyerId == buyer.Id);
                
                _sqlContext.SoftDelete(buyer, userId);
                _sqlContext.SoftDelete(locations, userId);
                
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
                        Message = "Houve um erro ao excluir o comprador"
                    },
                    ResponseData = false
                };
            }
        }
    }

}
