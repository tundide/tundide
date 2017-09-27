import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { CacheService, CacheStoragesEnum } from 'ng2-cache/ng2-cache';
import { ErrorService } from '../errors/error.service';
import { Observable } from 'rxjs';

@Injectable()
export class LocationService {
    private host: string = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;

    constructor(private http: Http,
        private _cacheService: CacheService,
        private errorService: ErrorService) {
        this._cacheService.useStorage(CacheStoragesEnum.LOCAL_STORAGE);
    }

    /**
     * List all Provinces
     */
    list() {
        if (this._cacheService.exists('Locations')) {
            return Observable.of(this._cacheService.get('Locations'));
        }

        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.get(this.host + '/location/', { headers: headers })
            .map((response: Response) => {
                const result = response.json();

                this._cacheService.set('Locations', result, { expires: Date.now() + 1000 * 60 * 60 });

                return result;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

}