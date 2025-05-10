using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace prova_pratica_mazzafc.Repository.Map
{
    [Table("odrorder")]
    public class Order
    {
        [Column("odrcod")]
        public int Id { get; set; }
        
        [Column("buycod")]
        public int BuyerId { get; set; }
        
        [Column("tyccod")]
        public int TypeCoinId { get; set; }

        public TypeCoinMap TypeCoin { get; set; }
        public ICollection<OrderMeat> OrderMeats { get; set; }
    }
}
