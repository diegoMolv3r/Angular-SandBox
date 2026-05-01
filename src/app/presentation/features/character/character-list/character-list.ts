import { Component, inject, signal, ElementRef, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { DragonBallApiService } from '../../../../data/api/dragon-ball.api/dragon-ball.api';
import { CharacterModel } from '../../../../domain/models/character.model';
import { TiltDirective } from '../../../shared/directives/tilt';
import { CharacterCard } from '../character-card/character-card';


@Component({
  selector: 'app-character-list',
  imports: [CharacterCard, TiltDirective],
  templateUrl: './character-list.html',
  styleUrl: './character-list.css',
})
export class CharacterList implements OnInit, AfterViewInit, OnDestroy {
  private readonly dragonBallApiService = inject(DragonBallApiService);
  private readonly el = inject(ElementRef);

  public readonly characters = signal<CharacterModel[]>([]);
  public readonly character = signal<CharacterModel | null>(null);

  private container!: HTMLElement;
  private isScrolling = false;
  private wheelHandler!: (e: WheelEvent) => void;
  private keyHandler!: (e: KeyboardEvent) => void;

  ngOnInit(): void {
    this.dragonBallApiService.getAllCharacters().subscribe((res) => {
      this.characters.set(res.items);
    });

    this.dragonBallApiService.getCharacterById(1).subscribe((character) => {
      this.character.set(character);
    });
  }

  ngAfterViewInit(): void {
    this.container = this.el.nativeElement.querySelector('.card-list');
    if (!this.container) return;

    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const scrollToSection = (targetIndex: number, duration = 900): void => {
      if (this.isScrolling) return;

      const sections = this.container.querySelectorAll('app-character-card');
      const clampedIndex = Math.max(0, Math.min(targetIndex, sections.length - 1));
      const targetY = clampedIndex * window.innerHeight;
      const startY = this.container.scrollTop;
      const diff = targetY - startY;

      if (Math.abs(diff) < 2) return;

      this.isScrolling = true;
      const startTime = performance.now();

      const step = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        this.container.scrollTop = startY + diff * easeInOutCubic(progress);

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          setTimeout(() => { this.isScrolling = false; }, 200);
        }
      };

      requestAnimationFrame(step);
    };

    const getCurrentIndex = () =>
      Math.round(this.container.scrollTop / window.innerHeight);

    this.wheelHandler = (e: WheelEvent) => {
      const currentIdx = getCurrentIndex();
      const sections = this.container.querySelectorAll('app-character-card');
      const total = sections.length;

      const goingUp = e.deltaY < 0;
      const goingDown = e.deltaY > 0;

      const atFirst = currentIdx <= 0 && goingUp;
      const atLast = currentIdx >= total - 1 && goingDown;

      if (atFirst || atLast) return;

      e.preventDefault();
      if (this.isScrolling) return;
      const dir = goingDown ? 1 : -1;
      scrollToSection(currentIdx + dir);
    };

    this.container.addEventListener('wheel', this.wheelHandler, { passive: false });

    this.keyHandler = (e: KeyboardEvent) => {
      if (['ArrowDown', 'ArrowRight', 'PageDown', 'Space'].includes(e.code)) {
        e.preventDefault();
        scrollToSection(getCurrentIndex() + 1);
      } else if (['ArrowUp', 'ArrowLeft', 'PageUp'].includes(e.code)) {
        e.preventDefault();
        scrollToSection(getCurrentIndex() - 1);
      }
    };

    window.addEventListener('keydown', this.keyHandler);
  }

  ngOnDestroy(): void {
    this.container?.removeEventListener('wheel', this.wheelHandler);
    window.removeEventListener('keydown', this.keyHandler);
  }
}
