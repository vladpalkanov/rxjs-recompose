import {
  AxiosInstance,
  AxiosInterceptorManager,
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
  default as axios,
} from 'axios';

import { Observable } from 'rxjs';

export namespace Http {

  export type RequestConfig = AxiosRequestConfig;

  export class Client {
    public requestInterceptors: AxiosInterceptorManager<RequestConfig>;
    public responseInterceptors: AxiosInterceptorManager<AxiosResponse>;
    private httpClient: AxiosInstance;

    constructor(
      options: RequestConfig = {},
    ) {
      this.httpClient = axios.create(options);
      this.requestInterceptors = this.httpClient.interceptors.request;
      this.responseInterceptors = this.httpClient.interceptors.response;
    }

    public get<T>(url: string, queryParams?: object) {
      return this._request<T>('GET', url, queryParams);
    }
  
    public post<T>(url: string, body: object, queryParams?: object) {
      return this._request<T>('POST', url, queryParams, body);
    }
    
    public put<T>(url: string, body: object, queryParams?: object) {
      return this._request<T>('PUT', url, queryParams, body);
    }
  
    public patch<T>(url: string, body: object, queryParams?: object) {
      return this._request<T>('PATCH', url, queryParams, body);
    }
    
    public delete(url: string, queryParams?: object) {
      return this._request('DELETE', url, queryParams);
    }
 
    private _request<T>(
      method: string,
      url: string,
      queryParams?: object,
      body?: object,
    ): Observable<T> {

      let request: AxiosPromise<T>;

      switch (method) {
        case 'GET':
          request = this.httpClient.get<T>(url, { params: queryParams });
          break;
        case 'POST':
          request = this.httpClient.post<T>(url, body, { params: queryParams });
          break;
        case 'PUT':
          request = this.httpClient.put<T>(url, body, { params: queryParams });
          break;
        case 'PATCH':
          request = this.httpClient.patch<T>(url, body, { params: queryParams });
          break;
        case 'DELETE':
          request = this.httpClient.delete(url, { params: queryParams });
          break;
      
        default:
          throw new Error('Method not supported');
      }

      return new Observable<T>(subscriber => {
        request.then(
          response => {
            subscriber.next(response.data);
            subscriber.complete();
          },
          (err: any) => {
            subscriber.error(err);
            subscriber.complete();
          }
        );
      });
    }
 
  }
  
}