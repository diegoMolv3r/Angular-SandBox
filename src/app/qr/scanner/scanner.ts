import { Component, ViewChild } from '@angular/core';
import { NgxScannerQrcodeComponent, ScannerQRCodeDevice, LOAD_WASM, ScannerQRCodeResult } from 'ngx-scanner-qrcode';

LOAD_WASM('assets/wasm/ngx-scanner-qrcode.wasm').subscribe();

@Component({
  selector: 'app-scanner',
  standalone: true, // Asegúrate de que coincida con tu versión de Angular
  imports: [NgxScannerQrcodeComponent],
  templateUrl: './scanner.html',
  styleUrl: './scanner.css',
})
export class Scanner {

  @ViewChild('action') scanner!: NgxScannerQrcodeComponent;

  public valorQR: string | undefined = '';

  private dispositivos: ScannerQRCodeDevice[] = [];
  private indiceActual = 0;

  /**
   * Cambiamos 'any' por 'ScannerQRCodeResult[]'
   */
  public onScan(event: ScannerQRCodeResult[]): void {
    if (event && event.length > 0) {
      // Ahora TypeScript sabe que 'event[0]' tiene una propiedad 'value'
      const valorLimpio = event[0].value;

      this.valorQR = valorLimpio;
      console.log("El dato escaneado es:", this.valorQR);

      // Aquí podrías llamar a tu servicio de Java Spring
    }
  }

  public voltearCamara(): void {
    if (this.dispositivos.length === 0) {
      this.scanner.devices.subscribe((dispositivos: ScannerQRCodeDevice[]) => {
        this.dispositivos = dispositivos;
        this.cambiarAlSiguiente();
      });
    } else {
      this.cambiarAlSiguiente();
    }
  }

  private cambiarAlSiguiente(): void {
    if (this.dispositivos.length < 2) {
      console.warn('Solo hay una cámara disponible');
      return;
    }

    this.indiceActual = (this.indiceActual + 1) % this.dispositivos.length;
    const siguienteDispositivo = this.dispositivos[this.indiceActual];

    this.scanner.playDevice(siguienteDispositivo.deviceId);
    console.log('Cámara cambiada a:', siguienteDispositivo.label || `Cámara ${this.indiceActual + 1}`);
  }
}