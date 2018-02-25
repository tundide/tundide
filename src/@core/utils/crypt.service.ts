import { Injectable } from '@angular/core';
import SimpleCryptoJS from 'simple-crypto-js';

@Injectable()
export class CryptService {

    // TODO: Guardar clave en archivo de configuracion.
    encrypt(value) {
        let simpleCrypto = new SimpleCryptoJS('ClaveAES');

        return simpleCrypto.encrypt(value);
    }

    decrypt(value) {
        let simpleCrypto = new SimpleCryptoJS('ClaveAES');
        let decipherText = simpleCrypto.decrypt(value);

        return decipherText;
    }
}