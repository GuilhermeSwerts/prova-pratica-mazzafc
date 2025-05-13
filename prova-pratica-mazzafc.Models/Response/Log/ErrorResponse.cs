using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace prova_pratica_mazzafc.Models.Response.Log
{
    public class ErrorResponse
    {
        public bool Status { get; set; }
        public MessageData Mensagem { get; set; } = null;

        public void AddMessage(MessageData messageData)
        {
            Mensagem = messageData;
        }

        public class MessageData
        {
            public MessageData(string mensagem, string ticket)
            {
                Mensagem = mensagem;
                Ticket = ticket;
            }

            public string Mensagem { get; set; }
            public string Ticket { get; set; }
        }
    }
}
