import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Movie } from '../../models/movie.model';
import { Observable } from 'rxjs';
import { AsyncPipe, NgIf, NgOptimizedImage } from '@angular/common';
import { CurrencyMillionsPipe } from '../../pipes/currency-millions.pipe';
import { DurationPipe } from '../../pipes/duration.pipe';
import { NameListPipe } from '../../pipes/name-list.pipe';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    NgOptimizedImage,
    CurrencyMillionsPipe,
    DurationPipe,
    NameListPipe
  ],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css'
})
export class MovieDetailComponent implements OnInit {
  movie$!: Observable<Movie>;

  constructor(private movieService: MovieService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.movie$ = this.movieService.movie$$.asObservable();

    this.route.params.subscribe((params: Params) => {
      const movieId = params['id'];
      this.movieService.fetchOne(movieId);
    })
  }

  onClickBack() {
    this.router.navigate(['movies']);
  }
}
