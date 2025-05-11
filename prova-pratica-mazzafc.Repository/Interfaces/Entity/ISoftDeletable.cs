using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace prova_pratica_mazzafc.Repository.Interfaces.Entity
{
    public interface ISoftDeletable
    {
        bool HasDeleted { get; set; }
        DateTime? DeletedOn { get; set; }
        int? DeletedUser { get; set; }
    }
}
