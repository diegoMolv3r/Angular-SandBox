import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { DragonBallApiService } from '../../../../data/api/dragon-ball.api/dragon-ball.api';
import { CharacterModel } from '../../../../domain/models/character.model';


type View = 'carousel' | 'detail';

@Component({
  selector: 'app-character-carousel',
  imports: [],
  templateUrl: './character-carousel.html',
  styleUrl: './character-carousel.css',
})
export class CharacterCarousel implements OnInit {
  private readonly api = inject(DragonBallApiService);

  readonly characters = signal<CharacterModel[]>([]);
  readonly view = signal<View>('carousel');
  readonly selectedIndex = signal(0);
  readonly carouselStart = signal(0);

  private readonly VISIBLE = 7;

  readonly selected = computed(() => this.characters()[this.selectedIndex()] ?? null);

  ngOnInit(): void {
    this.api.getAllCharacters().subscribe((res) => {
      this.characters.set(res.items ?? []);
    });
  }

  openDetail(index: number): void {
    this.selectedIndex.set(index);
    this.centerCarousel(index);
    this.view.set('detail');
  }

  goBack(): void {
    this.view.set('carousel');
  }

  nextDetail(): void {
    const next = (this.selectedIndex() + 1) % this.characters().length;
    this.selectedIndex.set(next);
    this.centerCarousel(next);
  }

  prevDetail(): void {
    const prev = (this.selectedIndex() - 1 + this.characters().length) % this.characters().length;
    this.selectedIndex.set(prev);
    this.centerCarousel(prev);
  }

  carouselNext(): void {
    const max = Math.max(0, this.characters().length - this.VISIBLE);
    this.carouselStart.update(v => Math.min(v + 1, max));
  }

  carouselPrev(): void {
    this.carouselStart.update(v => Math.max(v - 1, 0));
  }

  trackTransform(): string {
    return `translateX(calc(${-this.carouselStart()} * (var(--thumb-w) + var(--thumb-gap))))`;
  }

  pad(n: number): string {
    return n.toString().padStart(2, '0');
  }

  private centerCarousel(index: number): void {
    const half = Math.floor(this.VISIBLE / 2);
    const max = Math.max(0, this.characters().length - this.VISIBLE);
    this.carouselStart.set(Math.max(0, Math.min(index - half, max)));
  }
}
