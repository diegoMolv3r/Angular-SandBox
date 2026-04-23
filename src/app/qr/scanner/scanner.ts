import { Component, ViewChild } from '@angular/core';
import { NgxScannerQrcodeComponent, ScannerQRCodeDevice, LOAD_WASM } from 'ngx-scanner-qrcode';

LOAD_WASM('assets/wasm/ngx-scanner-qrcode.wasm').subscribe();

@Component({
  selector: 'app-scanner',
  imports: [NgxScannerQrcodeComponent],
  templateUrl: './scanner.html',
  styleUrl: './scanner.css',
})
export class Scanner {

  @ViewChild('action') scanner!: NgxScannerQrcodeComponent;

  public valorQR: string | undefined = '';

  /** Lista de cámaras disponibles */
  private dispositivos: ScannerQRCodeDevice[] = [];

  /** Índice de la cámara actualmente activa */
  private indiceActual: number = 0;

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

  /**
   * Voltea la cámara al siguiente dispositivo disponible.
   * Se suscribe a devices$ la primera vez para obtener la lista.
   */
  public voltearCamara(): void {
    // Si aún no cargamos la lista, nos suscribimos al observable
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

    // Avanzamos al siguiente índice (circular)
    this.indiceActual = (this.indiceActual + 1) % this.dispositivos.length;
    const siguienteDispositivo = this.dispositivos[this.indiceActual];

    // playDevice acepta un deviceId
    this.scanner.playDevice(siguienteDispositivo.deviceId);
    console.log('Cámara cambiada a:', siguienteDispositivo.label || `Cámara ${this.indiceActual + 1}`);
  }
}
