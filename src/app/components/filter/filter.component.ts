import { Component } from '@angular/core';
import { MovieFilters } from '../../models/movie-filter.model';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {
  private filters = {} as MovieFilters;

  constructor(private movieService: MovieService) {}

  onTitleChange(value: string) {
    this.filters.title = value;
    this.movieService.updateFilters(this.filters);
  }

  onYearChange(value: number) {
    this.filters.releaseYear = value;
    this.movieService.updateFilters(this.filters);
  }
}
