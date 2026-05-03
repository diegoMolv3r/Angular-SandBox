import { TestBed } from '@angular/core/testing';
import { DragonBallApiService } from './dragon-ball.api';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { CharacterModel } from '../../../domain/models/character.model';

describe('DragonBallApiService', () => {
  let service: DragonBallApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DragonBallApiService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(DragonBallApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all characters', () => {
    const mockResponse: { items: CharacterModel[] } = {
      items: [
        { id: "1", name: 'Goku', ki: 'Over 9000', maxKi: '10000', race: 'Saiyan', gender: 'Male', description: '', image: '', affiliation: '', deletedAt: '' }
      ]
    };


    service.getAllCharacters().subscribe((res) => {
      expect(res.items.length).toBeGreaterThan(0);
      expect(res.items.length).toBe(1);
      expect(res.items[0].name).toBe('Goku');
    });

    const req = httpMock.expectOne('https://dragonball-api.com/api/characters');
    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);
  });

  it('should get character by id', () => {
    const mockCharacter: CharacterModel = {
      id: "2", name: 'Vegeta', ki: '8000', maxKi: '9000', race: 'Saiyan', gender: 'Male', description: '', image: '', affiliation: '', deletedAt: ''
    };

    const characterId = 2;
    service.getCharacterById(characterId).subscribe((res) => {
      expect(res).toBeTruthy();
      expect(res).toEqual(mockCharacter);
      expect(res.id).toBe("2");
      expect(res.name).toBe("Vegeta");
    });

    const req = httpMock.expectOne('https://dragonball-api.com/api/characters/2');
    expect(req.request.method).toBe('GET');

    req.flush(mockCharacter);
  });

  it('should intentionally fail to show a red error', () => {
    expect(true).toBe(false);
  });
});
