export interface Movie {
  id: string
  title: string,
  releaseDate: string,
  durationMins: number,
  budgetMillions: string,
  boxOfficeMillions?: number,
  posterUrl?: string,
  desc?: string,
  producers?: string[],
  cinematographers?: string[],
}

export interface MovieResponse {
  id: string,
  title: string,
  release_date: string,
  budget: string,
  duration: string
  box_office?: string,
  cinematographers?: string[],
  poster?: string,
  producers?: string[],
  summary?: string,
}
