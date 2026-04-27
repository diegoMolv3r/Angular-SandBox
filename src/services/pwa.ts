import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Definimos la interfaz para el evento de instalación que el navegador no tiene por defecto
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

@Injectable({
  providedIn: 'root'
})
export class PwaService {

  // Reemplazamos 'any' por nuestra interfaz o null
  private promptEvent: BeforeInstallPromptEvent | null = null;

  public puedeInstalarse$ = new BehaviorSubject<boolean>(false);

  constructor() {
    this.iniciarEscucha();
  }

  private iniciarEscucha(): void {
    // Tipamos el evento como BeforeInstallPromptEvent
    window.addEventListener('beforeinstallprompt', (evento: Event) => {
      const pwaEvento = evento as BeforeInstallPromptEvent;
      pwaEvento.preventDefault();
      this.promptEvent = pwaEvento;

      this.puedeInstalarse$.next(true);
    });
  }

  public instalarApp(): void {
    if (this.promptEvent) {
      this.promptEvent.prompt();

      // Aquí ya no usamos 'any', el resultado ya está tipado por la interfaz
      this.promptEvent.userChoice.then((resultado) => {
        if (resultado.outcome === 'accepted') {
          console.log('Billetera instalada con éxito');
        } else {
          console.log('Instalación rechazada');
        }

        this.promptEvent = null;
        this.puedeInstalarse$.next(false);
      });
    }
  }
}