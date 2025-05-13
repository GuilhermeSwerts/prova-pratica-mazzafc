import axios from 'axios';
import { setGlobalLoader } from '../contexts/LoaderContext'
import { Alert } from '../utils/alert/Alert';
import { AwesomeApi } from '../types/awesomeApi/AwesomeApi';
const url = import.meta.env.VITE_AWESOME_API_URL;
const AWESOME_API_KEY = import.meta.env.VITE_AWESOME_API_KEY;

export const GetCurrentQuote = (coins: string[], setResponse: (currentsQuotes: AwesomeApi) => void) => {
    setGlobalLoader(true);
    try {
        var coinParam: string = coins.map(coin => `${coin}-BRL`).join(',');
        axios.get<AwesomeApi>(`${url}/${coinParam}`, {
            headers: {
                'x-api-key': AWESOME_API_KEY
            }
        })
            .then(response => {
                setResponse(response.data)
            })
            .catch(error => {
                Alert('Erro ao buscar a cotação atual', '', false, false);
            })
            .finally(() => {
                setGlobalLoader(false);
            });
    } catch (error) {
        Alert('Erro ao buscar a cotação atual', '', false, false);
    } finally {
        setGlobalLoader(false);
    }

}