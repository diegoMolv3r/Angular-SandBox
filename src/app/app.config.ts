import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideServiceWorker } from '@angular/service-worker';

import { CHARACTER_SERVICE_TOKEN } from './south-park-api/core/interfaces/icharacter-service';
import { provideHttpClient } from '@angular/common/http';
import { CharacterService } from './south-park-api/features/services/characterService/character-service';

export const appConfig: ApplicationConfig = {
  providers: [

    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    }),
    provideHttpClient(),
    {
      provide: CHARACTER_SERVICE_TOKEN, // Cuando pidan este token...
      useClass: CharacterService     // ...entrégales esta clase.
    }
  ]
};
