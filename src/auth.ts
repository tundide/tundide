import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AuthModule }              from './auth/auth.module';
import { enableProdMode } from '@angular/core';

/* development:start */
enableProdMode();
/* development:end */

platformBrowserDynamic().bootstrapModule(AuthModule).catch((error) => console.log('An error occured in bootsrap :', error));