# Angular SandBox — Dragon Ball

Proyecto Angular con arquitectura limpia que consume la [Dragon Ball API](https://dragonball-api.com/), construido como sandbox de aprendizaje y práctica.

## Desarrollo local

```bash
ng serve
```

Abrir `http://localhost:4200/` en el navegador.

## Comandos útiles

```bash
ng test          # ejecutar tests unitarios (Karma)
ng lint          # verificar reglas ESLint / Angular ESLint
ng build         # compilar para producción
```

---

## ¿Qué se puede testear en Angular?

Este proyecto está preparado para que practiques los principales tipos de tests que existen en Angular. Cada archivo `.spec.ts` corresponde a un elemento del proyecto.

### 1. Tests de Componentes

Son los más comunes. Verifican que el componente se renderiza correctamente, responde a `@Input()`, emite eventos y cambia de estado.

**Ejemplo básico — `CharacterCard`:**

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacterCard } from './character-card';
import { CharacterModel } from '../../../../domain/models/character.model';

describe('CharacterCard', () => {
  let fixture: ComponentFixture<CharacterCard>;
  let component: CharacterCard;

  const mockCharacter: CharacterModel = {
    id: '1', name: 'Goku', ki: '60.000.000', maxKi: '90 Septillion',
    race: 'Saiyan', gender: 'Male', description: 'The main protagonist.',
    image: 'https://example.com/goku.png', affiliation: 'Z Fighter', deletedAt: ''
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterCard],
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterCard);
    component = fixture.componentInstance;
    component.character = mockCharacter;
    fixture.detectChanges();
  });

  it('should render the character name', () => {
    const h1 = fixture.nativeElement.querySelector('h1');
    expect(h1.textContent).toContain('Goku');
  });

  it('should set the image src correctly', () => {
    const img = fixture.nativeElement.querySelector('img');
    expect(img.src).toContain('goku.png');
  });
});
```

---

### 2. Tests de Servicios

Verifican que el servicio hace las peticiones HTTP correctas y transforma los datos.  
Se usa `HttpClientTestingModule` para simular las respuestas sin hacer peticiones reales.

**Ejemplo — `DragonBallApiService`:**

```typescript
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DragonBallApiService } from './dragon-ball.api';

describe('DragonBallApiService', () => {
  let service: DragonBallApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DragonBallApiService],
    });
    service = TestBed.inject(DragonBallApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should fetch all characters', () => {
    const mockResponse = { items: [{ id: '1', name: 'Goku' }] };

    service.getAllCharacters().subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(r => r.url.includes('/characters'));
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
```

---

### 3. Tests de Directivas

Verifican que la directiva modifica correctamente el DOM o el comportamiento del elemento al que se aplica.

**Ejemplo — `TiltDirective`:**

```typescript
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TiltDirective } from './tilt';

@Component({
  template: `<div appTilt [tiltConfig]="{}"></div>`,
  imports: [TiltDirective],
  standalone: true,
})
class HostComponent {}

describe('TiltDirective', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('should apply to the host element', () => {
    const el = fixture.nativeElement.querySelector('div');
    expect(el).toBeTruthy();
  });
});
```

---

### 4. Tests de Signals y Estado

Angular Signals permiten state reactivo. Puedes testear que los signals cambian de valor correctamente al llamar métodos del componente.

**Ejemplo — `CharacterCarousel`:**

```typescript
it('should update selectedIndex when openDetail is called', () => {
  component.characters.set([mockChar1, mockChar2]);
  component.openDetail(1);
  expect(component.selectedIndex()).toBe(1);
  expect(component.view()).toBe('detail');
});

it('should go back to carousel on goBack', () => {
  component.view.set('detail');
  component.goBack();
  expect(component.view()).toBe('carousel');
});
```

---

### 5. Tests de Integración (CharacterList + CharacterCard)

Verifican que dos componentes interactúan correctamente entre sí.

```typescript
it('should render one card per character', () => {
  component.characters.set([mockChar1, mockChar2, mockChar3]);
  fixture.detectChanges();
  const cards = fixture.nativeElement.querySelectorAll('app-character-card');
  expect(cards.length).toBe(3);
});
```

---

### Tabla resumen

| Tipo de test       | Herramienta principal              | Archivo objetivo          |
|--------------------|------------------------------------|---------------------------|
| Componente         | `TestBed`, `ComponentFixture`      | `character-card.spec.ts`  |
| Servicio HTTP      | `HttpClientTestingModule`          | `dragon-ball.api.spec.ts` |
| Directiva          | `TestBed` con host component       | `tilt.spec.ts`            |
| Signals / Estado   | `ComponentFixture` + assertions    | `character-carousel.spec.ts` |
| Integración        | `TestBed` con múltiples componentes| `character-list.spec.ts`  |

---

## Recursos

- [Angular Testing Guide](https://angular.dev/guide/testing)
- [Dragon Ball API](https://dragonball-api.com/)
- [Angular ESLint](https://github.com/angular-eslint/angular-eslint)
