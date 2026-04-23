import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Generator } from "./qr/generator/generator";
import { Scanner } from './qr/scanner/scanner';
import { BotonInstalar } from "./boton-instalar/boton-instalar";

@Component({
  selector: 'app-root',
  imports: [CommonModule, Generator, Scanner, BotonInstalar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('SandBox');
}

