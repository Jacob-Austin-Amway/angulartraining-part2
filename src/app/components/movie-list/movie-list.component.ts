import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieTileComponent } from '../movie-tile/movie-tile.component';
import { NgForOf, NgIf } from '@angular/common';
import { Movie } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';
import { FilterComponent } from '../filter/filter.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [
    MovieTileComponent,
    NgForOf,
    FilterComponent,
    NgIf
  ],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent implements OnInit, OnDestroy {
  movies: Movie[] = [];
  sub!: Subscription;

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.sub = this.movieService.movies$$.subscribe({next: (movies) => this.movies = movies});
    this.movieService.fetchAll();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
