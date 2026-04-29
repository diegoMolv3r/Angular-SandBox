import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICharacterService } from '../../../core/interfaces/icharacter-service';
import { Character } from '../../models/Character';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CharacterService implements ICharacterService {
  private readonly baseUrl = 'https://spapi.dev/api/';

  private httpClient = inject(HttpClient);

  getAll(): Observable<Character[]> {
    return this.httpClient.get<{ data: Character[] }>(`${this.baseUrl}characters`).pipe(
      map(response => response.data as Character[])
    );
  }

  getById(id: number): Observable<Character> {
    // 1. Hacemos la petición a la API externa (esperando el JSON gigante)
    return this.httpClient.get<{ data: Record<string, string | number> }>(`https://spapi.dev/api/characters/${id}`).pipe(

      // 2. Interceptamos la respuesta antes de que llegue al componente
      map(response => {
        // Aislamos el objeto que contiene los datos reales
        const rawData = response.data;

        // 3. Mapeamos (Traducimos) al formato estricto de tu interfaz
        const characterLimpio: Character = {
          id: rawData['id'] as number,
          name: rawData['name'] as string,
          age: rawData['age'] as number,
          sex: rawData['sex'] as string,
          occupation: rawData['occupation'] as string,
          religion: rawData['religion'] as string,

          // ¡Magia de la Infraestructura! Transformamos el texto crudo a objetos Date reales
          // para que tu componente no tenga que lidiar con transformaciones de fechas.
          created_at: new Date(rawData['created_at'] as string),
          updated_at: new Date(rawData['updated_at'] as string),
          url: rawData['url'] as string
        };

        // 4. Entregamos el objeto limpio y perfecto
        return characterLimpio;
      })
    );
  }
}
