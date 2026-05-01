import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterCarousel } from "./presentation/features/character/character-carousel/character-carousel";
import { CharacterList } from "./presentation/features/character/character-list/character-list";

@Component({
  selector: 'app-root',
  imports: [CommonModule, CharacterCarousel, CharacterList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('SandBox');
}
