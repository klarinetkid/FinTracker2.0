import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
} from "axios";
import useToast from "../hooks/useToast";
import { ToastNotificationManager } from "../contexts/ToastNotificationManager";
import ToastManager from "../utils/ToastManager";

export const ApiBaseURL = "/api";

class BaseService {
    protected axiosInstance: AxiosInstance;

    constructor(area: string) {
        this.axiosInstance = axios.create({
            baseURL: ApiBaseURL + area,
            headers: {
                "Content-Type": "application/json",
            },
        });

        this.axiosInstance.interceptors.response.use(
            this.handleResponse,
            this.handleError
        );
    }

    private handleResponse(response: AxiosResponse) {
        return response.data;
    }

    private handleError(error: unknown) {
        //ToastNotificationManager.getInstance().AddToast({
        //    title: "Remote Error",
        //    type: "error",
        //    body: "An unexpected error has occurred on the remote server.",
        //});
        ToastManager.addToast({
            title: "Remote Error",
            type: "error",
            body: "An unexpected error has occurred on the remote server.",
        });
        return Promise.reject(error);
    }

    protected get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return this.axiosInstance.get(url, config);
    }

    protected post<T>(
        url: string,
        data: unknown,
        config?: AxiosRequestConfig
    ): Promise<T> {
        return this.axiosInstance.post(url, data, config);
    }

    protected put<T>(
        url: string,
        data: unknown,
        config?: AxiosRequestConfig
    ): Promise<T> {
        return this.axiosInstance.put(url, data, config);
    }

    protected patch<T>(
        url: string,
        data: unknown,
        config?: AxiosRequestConfig
    ): Promise<T> {
        return this.axiosInstance.patch(url, data, config);
    }

    protected delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return this.axiosInstance.delete(url, config);
    }
}

export default BaseService;
