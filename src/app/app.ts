import { CommonModule } from '@angular/common';
import { Pokeservice } from './../services/pokeservice';
import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

export interface Pokemon {
  name: string;
  url: string;
  photo: string;
  skills: any[];
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  poke = inject(Pokeservice);
  protected readonly title = signal('pokemon');
  all_pokemon = signal<Pokemon[]>([]);

  ngOnInit(): void {
    this.get_gen();
    // this.get_pokemon('charmander');
  }

  get_gen() {
    for (let index = 1; index <= 9; index++) {
      this.poke.getGeneration(index).subscribe((res) => {

        res.pokemon_species.forEach((val: any) => {
          this.poke.getPokemon(val.name).subscribe({
            next: (res) => {

              var poke_card: Pokemon = {
                name: res.name,
                url: val.url,
                photo: res.sprites.front_default,
                skills: res.abilities.map((m: any) => m.ability),
              };
              
              this.all_pokemon.update((obj) => [...obj, poke_card]);
            },
            error: (err) => {
              // console.error('getPokemon error', err);
            },
          });
          
        });
      });
    }
  }

  // get_pokemon(pokeName: string) {
  //   this.poke.getPokemon(pokeName).subscribe((res) => {
  //     console.log('POKEMON', res);
  //   });
  // }
}
