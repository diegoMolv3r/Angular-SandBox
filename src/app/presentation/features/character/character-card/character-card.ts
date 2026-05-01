import { Component, Input, ElementRef, inject, AfterViewInit, OnDestroy } from '@angular/core';
import { CharacterModel } from '../../../../domain/models/character.model';
import { TiltDirective } from '../../../shared/directives/tilt';

@Component({
  selector: 'app-character-card',
  imports: [TiltDirective],
  templateUrl: './character-card.html',
  styleUrl: './character-card.css',
})
export class CharacterCard implements AfterViewInit, OnDestroy {
  @Input() character!: CharacterModel;

  private readonly el = inject(ElementRef);
  private observer!: IntersectionObserver;
  private floatTimer: ReturnType<typeof setTimeout> | null = null;

  ngAfterViewInit(): void {
    const section = this.el.nativeElement.querySelector('.character-section');
    if (!section) return;

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // 1. Animar entrada de todos los elementos
          section.classList.add('is-visible');

          // 2. Después de que termine la transición de entrada (~1.1s), iniciar float
          this.floatTimer = setTimeout(() => {
            section.classList.add('is-floating');
          }, 1100);
        } else {
          // Al salir, limpiar todo para que se repita la animación al volver
          section.classList.remove('is-visible', 'is-floating');
          if (this.floatTimer) {
            clearTimeout(this.floatTimer);
            this.floatTimer = null;
          }
        }
      },
      { threshold: 0.4 }
    );

    this.observer.observe(section);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    if (this.floatTimer) clearTimeout(this.floatTimer);
  }
}
