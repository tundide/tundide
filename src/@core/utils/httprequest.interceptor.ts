import { RequestOptions, BaseRequestOptions, RequestOptionsArgs } from '@angular/http';

export class HttpRequestInterceptor extends BaseRequestOptions {
    merge(options?: RequestOptionsArgs): RequestOptions {
        options.url = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port + options.url;
        alert(options.url);
        let result = super.merge(options);
        result.merge = this.merge;
        return result;
    }
}