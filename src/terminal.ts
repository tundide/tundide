import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { TerminalModule }              from './terminal/terminal.module';
import { enableProdMode } from '@angular/core';

if (process.env.ENV === 'production') {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(TerminalModule).catch((error) => console.log('An error occured in bootsrap :', error));