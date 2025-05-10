using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace prova_pratica_mazzafc.Repository.Map
{
    [Table("tyccoin")]
    public class TypeCoinMap : MapBase
    {
        [Column("tyccod")]
        public int Id { get; set; }
        
        [Column("tycname")]
        public string Name { get; set; }
        
        [Column("tycprefix")]
        public string Prefix { get; set; }

        public ICollection<Order> Orders { get; set; }
    }
}
