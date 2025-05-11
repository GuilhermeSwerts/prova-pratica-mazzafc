using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace prova_pratica_mazzafc.Repository.Map
{
    [Table("metmeat")]
    public class MeatMap : MapBase
    {
        [Key]
        [Column("metcod")]
        public int Id { get; set; }
        
        [Column("metdescription")]
        public string Description { get; set; }

        public ICollection<MeatOriginMap> MeatsOrigins { get; set; }
    }
}
