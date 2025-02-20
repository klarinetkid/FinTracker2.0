import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
} from "axios";

const ApiBaseURL = "/api";

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

    private handleError(error: AxiosError) {
        // Handle errors here (e.g., logging, showing user-friendly messages)
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
