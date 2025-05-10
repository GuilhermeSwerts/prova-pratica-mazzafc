export type ApiResponse<T = any> = {
    requestSuccess: boolean;
    responseData: T;
    erro?: {
        message: string;
        exception?: any;
    };
};
