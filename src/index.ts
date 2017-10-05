import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { IndexModule }              from './index/index.module';
import { enableProdMode } from '@angular/core';

if (process.env.ENV === 'production') {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(IndexModule).catch((error) => console.log('An error occured in bootsrap :', error));