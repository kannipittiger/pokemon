import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pokemon } from '../app/app';

@Component({
  selector: 'app-pokemon-detail-modal',
  imports: [],
  standalone: true,
  templateUrl: './pokemon-detail-modal.html',
  styleUrl: './pokemon-detail-modal.css',
})
export class PokemonDetailModal {
  @Input({ required: true }) pokemon!: Pokemon;
  @Output() close = new EventEmitter<void>();
}
