import { Component, EventEmitter } from '@angular/core';
import { NgxScannerQrcodeComponent, LOAD_WASM } from 'ngx-scanner-qrcode';

LOAD_WASM('assets/wasm/ngx-scanner-qrcode.wasm').subscribe();

@Component({
  selector: 'app-scanner',
  imports: [NgxScannerQrcodeComponent],
  templateUrl: './scanner.html',
  styleUrl: './scanner.css',
})

export class Scanner {

  public valorQR: string | undefined = '';

  public onScan(event: any): void {
    if (event && event.length > 0) {
      // accedemos a la posición [0] del array y extraemos el valor
      const valorLimpio = event[0].value;

      this.valorQR = valorLimpio;

      console.log("El dato escaneado es:", this.valorQR);

      // aca deberia llamar a un servicio HTTP para enviar 'valorLimpio' a Java Spring
      // this.billeteraService.procesarTransaccion(valorLimpio).subscribe(...); por ejemplo
    }
  }
}
