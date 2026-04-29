import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { CHARACTER_SERVICE_TOKEN } from '../../../core/interfaces/icharacter-service';
import { CharacterService } from '../../services/characterService/character-service';
import { CharactersList } from './characters-list';

describe('CharactersList', () => {
  let component: CharactersList;
  let fixture: ComponentFixture<CharactersList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharactersList],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: CHARACTER_SERVICE_TOKEN,
          useClass: CharacterService
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharactersList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
