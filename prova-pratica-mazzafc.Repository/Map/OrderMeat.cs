using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace prova_pratica_mazzafc.Repository.Map
{
    [Table("omtorder_meat")]
    public class OrderMeat
    {
        [Column("omtcod")]
        public int Id { get; set; }
        
        [Column("ordcod")]
        public int OrderId { get; set; }
        
        [Column("ordquantity")]
        public int Quantity { get; set; }
        
        [Column("ordprice")]
        public decimal Price { get; set; }

        [Column("mticod")]
        public int MeatOriginId { get; set; }

        public Order Order { get; set; }
        public MeatOriginMap MeatOrigin { get; set; }
    }
}
