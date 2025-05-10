import { setGlobalLoader } from '../contexts/LoaderContext';
import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { Alert } from '../utils/alert/Alert';
import { ApiResponse } from '../types/services/api';

const url = import.meta.env.BASE_URL;

type Callback<T = any> = (response: T) => void;

export default class Api {
    private api: AxiosInstance;
    private access_token: string | null;
    private loginPage: string;
    constructor(urlBase: string = "") {
        this.loginPage = "/login";
        this.access_token = window.sessionStorage.getItem("access_token");
        this.api = axios.create({
            baseURL: urlBase,
            headers: {
                "Authorization": `Bearer ${this.access_token ?? ""}`
            }
        });
    }

    private execute = <T = any>(
        apiCall: Promise<AxiosResponse<ApiResponse<T>>>,
        funcResult?: (data: T) => void
    ): void => {
        setGlobalLoader(true);

        apiCall
            .then((response) => {
                const { requestSuccess, responseData, erro } = response.data;

                if (requestSuccess) {
                    funcResult?.(responseData);
                    return;
                }

                const { message, exception } = erro || {};
                console.log(exception);
                Alert(message ?? "Erro desconhecido", "", false);
            })
            .catch((err: AxiosError) => {
                console.error({ error: err });

                if (err.response?.status === 401) {
                    window.localStorage.removeItem("access_token");
                    window.location.href = this.loginPage;
                    return;
                }

                Alert("Houve um erro na solicitação!", "Por favor tente novamente mais tarde", false, false, false);
            })
            .finally(() => {
                setGlobalLoader(false);
            });
    };

    get = <T = any>(url: string, funcResult?: Callback<T>): void => {
        this.execute<T>(this.api.get<ApiResponse<T>>(url), funcResult);
    };

    delete = <T = any>(url: string, funcResult?: Callback<T>): void => {
        this.execute<T>(this.api.delete<ApiResponse<T>>(url), funcResult);
    };

    post = <T = any>(url: string, form: any, funcResult?: Callback<T>): void => {
        this.execute<T>(this.api.post<ApiResponse<T>>(url, form), funcResult);
    };

    put = <T = any>(url: string, form: any, funcResult?: Callback<T>): void => {
        this.execute<T>(this.api.put<ApiResponse<T>>(url, form), funcResult);
    };

}

export const api = new Api(url);
