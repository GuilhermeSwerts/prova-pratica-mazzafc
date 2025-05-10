import { useNavigate } from 'react-router-dom';

export default function NotFound() {
    const navigate = useNavigate();
    return (
        <div className="flex h-[calc(100vh-80px)] items-center justify-center p-5 bg-white w-full">
            <div className="text-center">
                <div className="inline-flex rounded-full bg-yellow-100 p-4">
                    <div className="rounded-full stroke-yellow-600 bg-yellow-200 p-4">
                        <svg
                            className="w-16 h-16"
                            viewBox="0 0 28 28"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M14.0002 9.33337V14M14.0002 18.6667H14.0118M25.6668 14C25.6668 20.4434 20.4435 25.6667 14.0002 25.6667C7.55684 25.6667 2.3335 20.4434 2.3335 14C2.3335 7.55672 7.55684 2.33337 14.0002 2.33337C20.4435 2.33337 25.6668 7.55672 25.6668 14Z"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>
                        </svg>
                    </div>
                </div>
                <h1 className="mt-5 text-[36px] font-bold text-slate-800 lg:text-[50px]">
                    404 - Pagina não encontrada
                </h1>
                <p className="text-slate-600 mt-5 lg:text-lg">
                    A página que você está procurando não existe.
                </p>
                <div className="mt-5 w-full flex-items-center justify-center">
                    <button
                        onClick={() => navigate(-1)}    
                        className="rounded-full hover:opacity-[0.7] duration-500 cursor-pointer text-white w-50 p-3 bg-gray-400" type="button">Voltar</button>
                </div>
            </div>
        </div >
    )
}
