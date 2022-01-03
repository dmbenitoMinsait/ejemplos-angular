import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import SocketIOClient from 'socket.io-client'

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();

  // TODO  con esto quitaríamos de producción los console.log
  // window.console.log = () => {}
}

export const socket = SocketIOClient('http://localhost:3200') // donde tenemos la base de datos

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
