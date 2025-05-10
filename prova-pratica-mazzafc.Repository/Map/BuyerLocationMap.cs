using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace prova_pratica_mazzafc.Repository.Map
{
    [Table("bltbuyer_location")]
    public class BuyerLocationMap : MapBase
    {
        [Key]
        [Column("bltcod")]
        public int Id { get; set; }

        [Column("bltcity")]
        public string City { get; set; }
        
        [Column("bltstate")]
        public string State { get; set; }

        [Column("buycod")]
        public int BuyerId { get; set; }

        public BuyerMap Buyer { get; set; }
    }
}
