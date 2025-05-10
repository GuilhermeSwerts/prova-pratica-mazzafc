import React, { createContext, useContext, useState } from 'react';
import Gif from '../assets/loader.gif';

type LoaderContextType = {
    setLoader: (state: boolean) => void;
};

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

let setLoaderGlobal: (state: boolean) => void = () => { };

export const LoaderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [loading, setLoading] = useState(false);

    setLoaderGlobal = setLoading;

    return (
        <LoaderContext.Provider value={{ setLoader: setLoading }}>
            {children}
            {loading && (
                <div className="fixed inset-0 bg-white/50 flex items-center flex-col justify-center z-50">
                    <img src={Gif} width={200} alt="" />
                    <span style={{marginTop:'-30px'}} className='2xl text-gray-500 font-bold'>Carregando...</span>
                </div>
            )}
        </LoaderContext.Provider>
    );
};

export const useLoader = () => {
    const context = useContext(LoaderContext);
    if (!context) throw new Error('useLoader deve ser usado dentro de LoaderProvider');
    return context;
};

export const setGlobalLoader = (state: boolean) => {
    setLoaderGlobal(state);
};
