using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace prova_pratica_mazzafc.Repository.Map
{
    public class MapBase
    {
        public int CreatedUser { get; set; }
        public DateTime CreatedOn { get; set; } = DateTime.Now;
        public DateTime? ModifyOn { get; set; }
        public int? ModifyUser { get; set; }
        public bool HasDeleted { get; set; }
        public DateTime? DeletedOn { get; set; }
        public int? DeletedUser { get; set; }
    }
}
