using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace prova_pratica_mazzafc.Repository.Map
{
    [Table("mtimeat_origin")]
    public class MeatOriginMap : MapBase
    {
        [Column("mticod")]
        public int Id { get; set; }

        [Column("metcod")]
        public int MeatId { get; set; }
        
        [Column("oricod")]
        public int OriginId { get; set; }

        public MeatMap Meat { get; set; }
        public OriginMap Origin { get; set; }

        public ICollection<OrderMeat> OrderMeats { get; set; }
    }
}
