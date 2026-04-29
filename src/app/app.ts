import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharactersList } from "./south-park-api/features/components/characters-list/characters-list";

@Component({
  selector: 'app-root',
  imports: [CommonModule, CharactersList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('SandBox');
}

