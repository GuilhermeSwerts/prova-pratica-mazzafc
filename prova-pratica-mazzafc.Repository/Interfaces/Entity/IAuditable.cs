using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace prova_pratica_mazzafc.Repository.Interfaces.Entity
{
    public interface IAuditable
    {
        DateTime CreatedOn { get; set; }
        int? CreatedUser { get; set; }
        DateTime? ModifyOn { get; set; }
        int? ModifyUser { get; set; }
    }
}
