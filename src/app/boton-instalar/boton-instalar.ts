import { Component } from '@angular/core';
import { PwaService } from '../../services/pwa';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-boton-instalar',
  imports: [],
  templateUrl: './boton-instalar.html',
  styleUrl: './boton-instalar.css',
})
export class BotonInstalar {
  // Inyectamos el servicio de forma pública para poder leerlo en el HTML
  constructor(public pwaService: PwaService) { }

  public solicitarInstalacion(): void {
    this.pwaService.instalarApp();
  }
}
