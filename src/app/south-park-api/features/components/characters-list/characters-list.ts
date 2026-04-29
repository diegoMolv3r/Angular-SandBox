import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms'; // <- 1. Importamos esto
import { CommonModule, DatePipe } from '@angular/common';
import { debounceTime, distinctUntilChanged, switchMap, filter } from 'rxjs/operators'; // <- 2. Superpoderes de RxJS
import { ICharacterService, CHARACTER_SERVICE_TOKEN } from '../../../core/interfaces/icharacter-service';
import { Character } from "../../models/Character";


@Component({
  selector: 'app-characters-list',
  imports: [CommonModule, ReactiveFormsModule, DatePipe],
  templateUrl: './characters-list.html',
  styleUrl: './characters-list.css',
})
export class CharactersList implements OnInit {
  private readonly characterService = inject<ICharacterService>(CHARACTER_SERVICE_TOKEN);

  buscador = new FormControl('');
  characters: Character[] = [];
  uniqueCharacter?: Character;

  // ngOnInit(): void {
  //   this.characterService.getAll().subscribe({
  //     next: (response: any) => {
  //       this.characters = response.data;

  //     },
  //     error: (err) => {
  //       console.error('Error cargando personajes', err);
  //     },
  //     complete: () => {
  //       console.log(this.characters);
  //     }
  //   });
  // }

  ngOnInit(): void {
    // 4. Escuchamos cada vez que el valor del input cambia
    this.buscador.valueChanges.pipe(
      // Evita buscar si el input está vacío
      filter(texto => texto !== null && texto.length > 0),

      // SUPERPODER 1: Espera a que el usuario deje de escribir por 500ms antes de avanzar
      debounceTime(500),

      // Evita buscar si el usuario escribió "12", borró el "2" y volvió a poner "2" rápido
      distinctUntilChanged(),

      // SUPERPODER 2: Cancela peticiones anteriores. Si pidió el "12" y luego el "123", aborta la del "12".
      // Además, convertimos el string a Number para que el servicio no se queje.
      switchMap(texto => this.characterService.getById(Number(texto)))

    ).subscribe({
      next: (character: Character) => {
        this.uniqueCharacter = character;
      },
      error: (err) => {
        console.error('Personaje no encontrado', err);
        this.uniqueCharacter = undefined;
      }
    });
  }
}