import { Observable } from 'rxjs';
import { Character } from '../../features/models/Character';
import { InjectionToken } from '@angular/core';

export interface ICharacterService {
    getAll(): Observable<Character[]>;
    getById(id: number): Observable<Character>;
}

export const CHARACTER_SERVICE_TOKEN = new InjectionToken<ICharacterService>('CharacterServiceToken');
