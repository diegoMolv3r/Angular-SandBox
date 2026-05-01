import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CharacterModel } from '../../../domain/models/character.model';

@Injectable({
  providedIn: 'root',
})
export class DragonBallApiService {
  private readonly baseUrl = 'https://dragonball-api.com/api';
  private readonly httpCliente = inject(HttpClient);

  getAllCharacters() {
    return this.httpCliente.get<{ items: CharacterModel[] }>(`${this.baseUrl}/characters`);
  }

  getCharacterById(id: number) {
    return this.httpCliente.get<CharacterModel>(`${this.baseUrl}/characters/${id}`);
  }

}
