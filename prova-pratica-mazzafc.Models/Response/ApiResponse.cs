namespace prova_pratica_mazzafc.Models.Response
{
    public class ApiResponse<T>
    {
        public bool RequestSuccess { get; set; }
        public T ResponseData { get; set; }
        public ApiErro Erro { get; set; }
    }

    public class ApiErro
    {
        public string Message { get; set; }
        public string Exception { get; set; }
    }

}