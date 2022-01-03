import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor() { }


  error(msg: string): void{
    console.error(`[ERROR] ${new Date().toLocaleDateString()} ${msg}`)
    // console.error('[ERROR] ' + msg) // También se podría poner así
  }

  warn(msg: string): void{
    console.warn(`[WARN] ${new Date().toLocaleDateString()} ${msg}`)
  }
  

}
