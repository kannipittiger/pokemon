import { inject, Injectable } from '@angular/core';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Pokeservice {
  http = inject(HttpClient);
  
  getGeneration(generationNumber: number): Observable<any> {
    return this.http.get<any>(
      `https://pokeapi.co/api/v2/generation/${generationNumber}`
    );
  }

  getPokemon(pokeName: string): Observable<any> {
    return this.http.get<any>(
      `https://pokeapi.co/api/v2/pokemon/${pokeName}`
    );
  }
}
