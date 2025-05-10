using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace prova_pratica_mazzafc.Repository.Map
{
    [Table("lrr_log_request_response")]
    public class LogError
    {
        [Key]
        [Column("lrr_pk")]
        public int Id { get; set; }

        [Column("lrr_edpoint")]
        public string Endpoint { get; set; }
        
        [Column("lrr_method")]
        public string Method { get; set; }

        [Column("lrr_request")]
        public string Request { get; set; }

        [Column("lrr_response")]
        public string Response { get; set; }

        [Column("lrr_data_request")]
        public DateTime DtRequest { get; set; }

        [Column("lrr_data_response")]
        public DateTime DtResponse { get; set; }

        [Column("lrr_ticket")]
        public Guid Ticket { get; set; }

        [Column("lrr_code_http")]
        public int HttpCod { get; set; }
    }
}