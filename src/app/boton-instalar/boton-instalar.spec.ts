import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonInstalar } from './boton-instalar';

describe('BotonInstalar', () => {
  let component: BotonInstalar;
  let fixture: ComponentFixture<BotonInstalar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotonInstalar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotonInstalar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
