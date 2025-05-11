using Microsoft.EntityFrameworkCore;
using prova_pratica_mazzafc.Models.Request.Meat;
using prova_pratica_mazzafc.Models.Response;
using prova_pratica_mazzafc.Models.Response.Meat;
using prova_pratica_mazzafc.Repository;
using prova_pratica_mazzafc.Repository.Map;
using prova_pratica_mazzafc.Service.Interfaces.Meat;
using prova_pratica_mazzafc.Util.ExtensionsMethods;


namespace prova_pratica_mazzafc.Service.Services.Meat
{
    public class MeatService(SqlContext _sqlContext) : IMeatService
    {
        public ApiResponse<List<MeatDto>> AllMeats()
        {
            try
            {
                var meats = _sqlContext.MeatsOrigins
                     .Include(x=> x.Origin)
                     .Include(x=> x.Meat)
                     .Where(x => !x.HasDeleted && !x.Meat.HasDeleted && !x.Origin.HasDeleted)
                     .Select(x => new MeatDto
                     {
                         DtRegister = x.CreatedOn.ToString("dd/MM/yyyy hh:mm:ss"),
                         Identifier = x.Identifier.ToString(),
                         Name = x.Meat.Description,
                         Origin = x.Origin.Description
                     })
                     .ToList();

                return new ApiResponse<List<MeatDto>>
                {
                    RequestSuccess = true,
                    ResponseData = meats
                };
            }
            catch (Exception ex)
            {
                return new ApiResponse<List<MeatDto>>
                {
                    Erro = new ApiErro
                    {
                        Exception = ex.Message,
                        Message = "Houve um erro ao buscar todas Carnes"
                    },
                    RequestSuccess = false,
                    ResponseData = []
                };
            }
        }

        public ApiResponse<bool> NewMeat(MeatRequest request, int userId)
        {
            using var tran = _sqlContext.Database.BeginTransaction();
            try
            {
                var meet = new MeatMap
                {
                    Description = request.Description,
                };

                if(_sqlContext.Meats.Any(x => x.Description == request.Description && !x.HasDeleted))
                {
                    meet = _sqlContext.Meats.First(x => x.Description == request.Description && !x.HasDeleted);
                    if(_sqlContext.MeatsOrigins.Any(x=> x.MeatId == meet.Id && x.OriginId == request.Origin))
                    {
                        return new ApiResponse<bool>
                        {
                            Erro = new()
                            {
                                Message = "Carne já registrada para a origem."
                            },
                            RequestSuccess = false,
                            ResponseData = false
                        };
                    }

                    var meatOrigin = new MeatOriginMap
                    {
                        OriginId = request.Origin,
                        MeatId = meet.Id
                    };

                    _sqlContext.Insert(meatOrigin, userId);
                }
                else
                {
                    _sqlContext.Insert(meet,userId);
                    
                    var meatOrigin = new MeatOriginMap
                    {
                        OriginId = request.Origin,
                        MeatId = meet.Id
                    };
                    _sqlContext.Insert(meatOrigin, userId);
                }

                tran.Commit();
                return new ApiResponse<bool>
                {
                    Erro = new(),
                    RequestSuccess = true,
                    ResponseData = true
                };
            }
            catch (Exception ex)
            {
                tran.Rollback();
                return new ApiResponse<bool>
                {
                    Erro = new ApiErro
                    {
                        Exception = ex.Message,
                        Message = "Houve um erro ao criar uma nova Carne"
                    },
                    RequestSuccess = false,
                    ResponseData = false
                };
            }
        }

        public ApiResponse<MeatDto> MeatByIdentifier(Guid identifier)
        {
            try
            {
                var meat = _sqlContext.GetByIdentifier<MeatOriginMap>(identifier, x => x.Origin, x => x.Meat);
                return new ApiResponse<MeatDto>
                {
                    RequestSuccess = true,
                    ResponseData = new MeatDto
                    {
                        DtRegister = meat.CreatedOn.ToString("dd/MM/yyyy hh:mm:ss"),
                        Identifier = meat.Identifier.ToString(),
                        Name = meat.Meat.Description,
                        Origin = meat.Origin.Description
                    }
                };
            }
            catch (Exception ex)
            {
                return new ApiResponse<MeatDto>
                {
                    Erro = new ApiErro
                    {
                        Exception = ex.Message,
                        Message = "Houve um erro ao buscar todas Carnes"
                    },
                    RequestSuccess = false,
                    ResponseData = new()
                };
            }
        }

        public ApiResponse<bool> ModifyMeat(MeatRequest request, int userId)
        {
            using var tran = _sqlContext.Database.BeginTransaction();
            try
            {
                var meat = _sqlContext.GetByIdentifier<MeatOriginMap>(request.Identifier.Value, x => x.Origin, x => x.Meat);

                meat.Meat.Description = request.Description;
                meat.OriginId = request.Origin;

                _sqlContext.Update(meat, userId);
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
                    Erro = new ApiErro
                    {
                        Exception = ex.Message,
                        Message = "Houve um erro ao buscar todas Carnes"
                    },
                    RequestSuccess = false,
                    ResponseData = new()
                };
            }
        }

        public ApiResponse<bool> DeleteMeat(Guid identifier, int userId)
        {
            using var tran = _sqlContext.Database.BeginTransaction();
            try
            {
                var meat = _sqlContext.GetByIdentifier<MeatOriginMap>(identifier,x=> x.Origin,x=> x.Meat);
                
                if(_sqlContext.MeatsOrigins.Count(x=> x.MeatId == meat.Meat.Id && !x.HasDeleted) == 1)
                {
                    meat.Meat.HasDeleted = true;
                    meat.Meat.DeletedOn = DateTime.Now;
                    meat.Meat.DeletedUser = userId;
                }

                _sqlContext.SoftDelete(meat, userId);
              
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
                    Erro = new ApiErro
                    {
                        Exception = ex.Message,
                        Message = "Houve um erro ao buscar todas Carnes"
                    },
                    RequestSuccess = false,
                    ResponseData = new()
                };
            }
        }
    }
}
