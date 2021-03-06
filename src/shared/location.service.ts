import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// TODO: import { CacheService, CacheStoragesEnum } from 'ng2-cache/ng2-cache';
import { Observable } from 'rxjs';

@Injectable()
export class LocationService {
    private host: string = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;

    constructor(private http: HttpClient,
        ) { // TODO: private _cacheService: CacheService
        // TODO: Ver que onda esto, se rompio cuando migre webpack
        // this._cacheService.useStorage(CacheStoragesEnum.LOCAL_STORAGE);
    }

    /**
     * List all Provinces
     */
    list() {
        // TODO:  if (this._cacheService.exists('Locations')) {
        //     return Observable.of(this._cacheService.get('Locations'));
        // }

        return this.http.get(this.host + '/location/');
        // TODO: Agregar el manejo de cache
        // .subscribe(data => {
        //     this._cacheService.set('Locations', data, { expires: Date.now() + 1000 * 60 * 60 });
        //     return data;
        // });
    }
}