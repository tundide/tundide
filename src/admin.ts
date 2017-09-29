import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AdminModule }              from './admin/admin.module';
import { enableProdMode } from '@angular/core';

if (process.env.ENV === 'production') {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AdminModule).catch((error) => console.log('An error occured in bootsrap :', error));