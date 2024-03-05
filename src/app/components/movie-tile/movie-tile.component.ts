import { Component, Input } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { Router } from '@angular/router';
import { CurrencyMillionsPipe } from '../../pipes/currency-millions.pipe';
import { DurationPipe } from '../../pipes/duration.pipe';

@Component({
  selector: 'app-movie-tile',
  standalone: true,
  imports: [
    CurrencyMillionsPipe,
    DurationPipe
  ],
  templateUrl: './movie-tile.component.html',
  styleUrl: './movie-tile.component.css'
})
export class MovieTileComponent {
  @Input() movie!: Movie;

  constructor(private router: Router) {}

  onClickDetails() {
    this.router.navigate(['movies', this.movie.id]);
  }
}
