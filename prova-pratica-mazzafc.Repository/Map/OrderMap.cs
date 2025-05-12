using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace prova_pratica_mazzafc.Repository.Map
{
    [Table("odrorder")]
    public class OrderMap : MapBase
    {
        [Column("odrcod")]
        public int Id { get; set; }
        
        [Column("buycod")]
        public int BuyerId { get; set; }
        
        [Column("tyccod")]
        public int TypeCoinId { get; set; }

        [Column("ordtotal")]
        public decimal Total { get; set; }

        public TypeCoinMap TypeCoin { get; set; }
        public ICollection<OrderMeatMap> OrderMeats { get; set; }
    }
}
