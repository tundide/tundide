import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
import { enableProdMode } from '@angular/core';

/* development:start */
enableProdMode();
/* development:end */

platformBrowserDynamic().bootstrapModule(AppModule).catch((error) => console.log('An error occured in bootsrap :', error));