using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace prova_pratica_mazzafc.Repository.Map
{
    [Table("buybuyer")]
    public class BuyerMap : MapBase
    {
        [Key]
        [Column("buycod")]
        public int Id { get; set; }

        [Column("buydoc_number")]
        public string DocNumber { get; set; }
        
        [Column("buyname")]
        public string Name { get; set; }

        public ICollection<BuyerLocationMap> Locations { get; set; }
    }
}
