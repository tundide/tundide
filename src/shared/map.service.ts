import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MapService {

    constructor(private http: HttpClient) {
    }

    /**
     * Get geocode from street
     * @param  {String} address The address to get geocode
     */
    getGeocodeFromAddress(address) {
        return this.http.get('http://maps.google.com/maps/api/geocode/json?address=' + address, null);
    }

    /**
     * Get geocode from street
     * @param  {String} address The address to get geocode
     */
    getGeocodeFromLatLon(lat, lon) {
        return this.http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lon + '&sensor=true', null);
    }
}