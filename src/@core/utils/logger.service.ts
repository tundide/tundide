import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class LoggerService {
    log(error) {
        console.log('LoggerService', error);
    }
}