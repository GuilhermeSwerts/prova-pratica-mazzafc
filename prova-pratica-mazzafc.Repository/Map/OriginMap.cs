using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace prova_pratica_mazzafc.Repository.Map
{
    [Table("oriorigin")]
    public class OriginMap : MapBase
    {
        [Key]
        [Column("oricod")]
        public int Id { get; set; }

        [Column("oridescription")]
        public string Description { get; set; }

        public ICollection<MeatMap> Meats { get; set; }
    }
}
