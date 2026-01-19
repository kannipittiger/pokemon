import { CommonModule } from '@angular/common';
import { Component, inject, signal, OnInit } from '@angular/core';
import { Pokeservice } from './../services/pokeservice';
import { PokemonDetailModal } from '../pokemon-detail-modal/pokemon-detail-modal';

export interface Pokemon {
  name: string;
  url: string;
  photo: string;
  skills: any[];
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,PokemonDetailModal],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private poke = inject(Pokeservice);

  title = signal('pokemon');
  all_pokemon = signal<Pokemon[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);
  selectedPokemon = signal<Pokemon | null>(null);

  ngOnInit(): void {
    this.get_gen();
  }

  get_gen() {
    this.loading.set(true);
    this.error.set(null);

    let completedRequests = 0;
    const TOTAL_GEN = 9;

    for (let gen = 1; gen <= TOTAL_GEN; gen++) {
      this.poke.getGeneration(gen).subscribe({
        next: (genRes: any) => {
          genRes.pokemon_species.forEach((val: any) => {
            this.poke.getPokemon(val.name).subscribe({
              next: (pokeRes: any) => {
                const poke_card: Pokemon = {
                  name: pokeRes.name,
                  url: val.url,
                  photo: pokeRes.sprites.front_default,
                  skills: pokeRes.abilities.map((m: any) => m.ability),
                };

                this.all_pokemon.update((list) => [...list, poke_card]);
              },
              error: () => {
                // this.error.set('Failed to load some Pokémon data.');
              },
            });
          });
        },
        error: () => {
          // this.error.set('Failed to load Pokémon generations.');
        },
        complete: () => {
          completedRequests++;
          if (completedRequests === TOTAL_GEN) {
            this.loading.set(false);
          }
        },
      });
    }
  }

  isLoading() {
    return this.loading();
  }

  errorMessage() {
    return this.error();
  }

  chunkedPokemon() {
    const size = 16;
    const result: Pokemon[][] = [];

    const list = this.all_pokemon();
    for (let i = 0; i < list.length; i += size) {
      result.push(list.slice(i, i + size));
    }

    return result;
  }
}
