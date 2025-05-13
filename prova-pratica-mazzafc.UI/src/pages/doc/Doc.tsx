export default function Doc() {
    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8">
            <section>
                <h1 className="text-3xl font-bold">Projeto: prova_pratica_mazzafc</h1>
                <p className="text-gray-700">
                    Este projeto consiste em uma aplicação full stack com front-end em
                    <strong> React (TSX)</strong> e back-end em <strong>.NET 8</strong> utilizando
                    <strong> Entity Framework Core</strong> para acesso a banco de dados SQL Server.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold">Tecnologias Utilizadas</h2>
                <ul className="list-disc list-inside text-gray-700">
                    <li><strong>Front-end:</strong> React (TSX), Node.js v22.4.1</li>
                    <li><strong>Back-end:</strong> ASP.NET Core 8</li>
                    <li><strong>ORM:</strong> Entity Framework Core</li>
                    <li><strong>Banco de Dados:</strong> SQL Server</li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-semibold">Estrutura da Solução</h2>
                <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
                    {`
prova-pratica-mazzafc
│
├── 01 Application
│   ├── prova-pratica-mazzafc.Host        -> Projeto principal de inicialização
│   └── prova-pratica-mazzafc.UI          -> Front-end em TSX
│
├── 02 Domain
│   ├── prova-pratica-mazzafc.Business    -> Lógica de negócio
│   ├── prova-pratica-mazzafc.Models      -> Modelos de domínio
│   └── prova-pratica-mazzafc.Util        -> Utilitários
│
├── 03 Infra
│   └── prova-pratica-mazzafc.Repository  -> Repositórios e persistência
│
├── 04 IOC
│   └── prova-pratica-mazzafc.Ioc         -> Injeção de dependência
│
├── Doc                                    -> Scripts SQL de criação do banco
└── prova-pratica-mazzafc.sln             -> Solução do Visual Studio
`}
                </pre>
            </section>

            <section>
                <h2 className="text-2xl font-semibold">Passos para Executar o Projeto</h2>

                <div>
                    <h3 className="text-xl font-medium">1. Configurar o Front-end</h3>
                    <p className="text-gray-700">Acesse a pasta do front-end:</p>
                    <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
                        {`cd ~/prova-pratica-mazzafc/prova-pratica-mazzafc.UI
npm install`}
                    </pre>
                </div>

                <div>
                    <h3 className="text-xl font-medium mt-6">2. Abrir e Configurar a Solução no Visual Studio</h3>
                    <ol className="list-decimal list-inside text-gray-700 space-y-1">
                        <li>Abra o arquivo <code>prova-pratica-mazzafc.sln</code> localizado na raiz do projeto:</li>
                        <li>Defina <strong>prova-pratica-mazzafc.Host</strong> como projeto de inicialização.</li>
                        <li>Verifique o <code>appsettings.json</code> e confira a connection string.</li>
                    </ol>
                </div>

                <div>
                    <h3 className="text-xl font-medium mt-6">3. Banco de Dados</h3>
                    <p className="text-gray-700">Os scripts estão em:</p>
                    <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
                        {`~/prova-pratica-mazzafc/Doc`}
                    </pre>
                    <p className="text-gray-700">Execute os scripts na ordem especificada para restaurar o banco.</p>
                </div>

                <div>
                    <h3 className="text-xl font-medium mt-6">4. Executar o Projeto</h3>
                    <p className="text-gray-700">Pressione <code>F5</code> no Visual Studio para compilar e executar.</p>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-semibold">Observações</h2>
                <ul className="list-disc list-inside text-gray-700">
                    <li>Certifique-se de que o SQL Server esteja rodando corretamente.</li>
                    <li>Garanta que os scripts do banco foram executados com sucesso antes de iniciar a API.</li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-semibold">Autor</h2>
                <p className="text-gray-700">
                    Desenvolvido para <strong>Prova Técnica</strong> da <strong>MazzaFc</strong> e <strong>MinervaFoods</strong>.
                </p>
                <p className="text-gray-600 text-sm">
                    Documentação Gerada com ajuda de IA<br />
                    Documentação validada por: <strong>Guilherme Swerts</strong> no dia <strong>12/05/2025</strong>
                </p>
            </section>
        </div>
    );
}
