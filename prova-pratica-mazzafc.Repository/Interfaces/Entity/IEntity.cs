using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace prova_pratica_mazzafc.Repository.Interfaces.Entity
{
    public interface IEntity
    {
        int Id { get; set; }

        Guid Identifier { get; set; }
    }
}
