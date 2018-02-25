import { Injectable } from '@angular/core';
import { CryptService } from './crypt.service';

@Injectable()
export class StorageService {

    constructor(
        private cryptService: CryptService
    ) {

    }

    get(key, persistent?) {
        let item = null;
        if (persistent) {
            item = localStorage.getItem(key);
        } else {
            item = sessionStorage.getItem(key);
        }

        if (item != null) {
            item = this.cryptService.decrypt(item);
        }


        return JSON.parse(item);
    }

    getAndRemove(key, persistent?) {
        let item = null;
        if (persistent) {
            item = localStorage.getItem(key);
        } else {
            item = sessionStorage.getItem(key);
        }

        if (item != null) {
            item = this.cryptService.decrypt(item);
        }

        this.remove(key, persistent);

        return JSON.parse(item);
    }

    set(key, value, persistent?) {
        let val = this.cryptService.encrypt(JSON.stringify(value));

        if (persistent) {
            localStorage.setItem(key, val);
        } else {
            sessionStorage.setItem(key, val);
        }
    }

    remove(key, persistent?) {
        if (persistent) {
            localStorage.removeItem(key);
        } else {
            sessionStorage.removeItem(key);
        }
    }
}