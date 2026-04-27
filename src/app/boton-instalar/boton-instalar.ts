import { Component, inject } from '@angular/core';
import { PwaService } from '../../services/pwa';

@Component({
  selector: 'app-boton-instalar',
  imports: [],
  templateUrl: './boton-instalar.html',
  styleUrl: './boton-instalar.css',
})
export class BotonInstalar {
  // Inyectamos el servicio de forma pública para poder leerlo en el HTML
  public readonly pwaService = inject(PwaService);

  public solicitarInstalacion(): void {
    this.pwaService.instalarApp();
  }
}
