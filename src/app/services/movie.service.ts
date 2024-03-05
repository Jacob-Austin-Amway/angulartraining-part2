import { Injectable } from '@angular/core';
import { Movie, MovieResponse } from '../models/movie.model';
import { BehaviorSubject, map } from 'rxjs';
import { MovieFilters } from '../models/movie-filter.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  movies$$ = new BehaviorSubject<Movie[]>([{} as Movie]);
  movie$$ = new BehaviorSubject<Movie>({} as Movie);

  filters = {} as MovieFilters;

  constructor(private http: HttpClient) {}

  updateFilters(filters: MovieFilters = {} as MovieFilters) {
    this.filters = filters;
    this.fetchAll();
  }

  fetchAll() {
    this.http.get<MovieResponse[]>('/movies').pipe(
      map((respMovies) => {
        return respMovies.map((respMovie) => {
          return {
            id: respMovie.id,
            title: respMovie.title,
            releaseDate: respMovie.release_date,
            budgetMillions: respMovie.budget,
            durationMins: +respMovie.duration,
          } as Movie;
        })
      }),
      map((movies) => {
        return this.filters
          ? movies.filter((movie) =>
            (!this.filters.releaseYear || this.filterYear(this.filters.releaseYear, movie.releaseDate))
              && (!this.filters.title || movie.title.toUpperCase().includes(this.filters.title.toUpperCase())))
          : movies;
      }),
    ).subscribe((movies) => this.movies$$.next(movies));
  }

  fetchOne(id: string) {
    // clear out old movie details
    this.movie$$.next({} as Movie);

    this.http.get<MovieResponse>(`/movies/${id}`).pipe(
      map((respMovie) => {
        return {
          id: respMovie.id,
          title: respMovie.title,
          durationMins: +respMovie.duration,
          budgetMillions: respMovie.budget,
          releaseDate: respMovie.release_date,
          boxOfficeMillions: respMovie.box_office,
          cinematographers: respMovie.cinematographers,
          posterUrl: respMovie.poster,
          producers: respMovie.producers,
          desc: respMovie.summary,
        } as Movie;
      }),
    ).subscribe((movie) => {
      this.movie$$.next(movie);
    });
  }

  // Assumes date is formatted yyyy-mm-dd
  private filterYear(year: number, date: string) {
    return date.split('-')[0].includes(year.toString());
  }
}
