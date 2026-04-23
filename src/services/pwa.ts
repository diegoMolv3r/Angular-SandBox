import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  // Esto hace que el servicio sea un "Singleton" (se instancia una sola vez al abrir la app)
  providedIn: 'root'
})
export class PwaService {

  private promptEvent: any;

  // BehaviorSubject emitirá 'true' cuando la app esté lista para instalarse
  public puedeInstalarse$ = new BehaviorSubject<boolean>(false);

  constructor() {
    this.iniciarEscucha();
  }

  private iniciarEscucha(): void {
    // Escuchamos el evento global del navegador desde el segundo cero
    window.addEventListener('beforeinstallprompt', (evento: Event) => {
      evento.preventDefault(); // Evita el banner nativo
      this.promptEvent = evento; // Guardamos el evento

      // Le avisamos a toda la app que ya se puede mostrar el botón
      this.puedeInstalarse$.next(true);
    });
  }

  public instalarApp(): void {
    if (this.promptEvent) {
      // Lanzamos el cartel de instalación
      this.promptEvent.prompt();

      // Esperamos la respuesta del usuario (alumno/padre)
      this.promptEvent.userChoice.then((resultado: any) => {
        if (resultado.outcome === 'accepted') {
          console.log('Billetera instalada con éxito');
        } else {
          console.log('Instalación rechazada');
        }

        // Limpiamos el evento y ocultamos el botón
        this.promptEvent = null;
        this.puedeInstalarse$.next(false);
      });
    }
  }
}