using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace prova_pratica_mazzafc.Repository.Map
{
    [Table("usuuser")]
    public class UserMap : MapBase
    {
        [Key]
        [Column("usucod")]
        public int Id { get; set; }

        [Column("usuusername")]
        public string Name { get; set; }

        [Column("userpassword")]
        public string Password { get; set; }
    }

}
