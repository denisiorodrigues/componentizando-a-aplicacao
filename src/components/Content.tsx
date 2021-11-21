import { useEffect, useState } from 'react';
import { MovieCard } from './MovieCard';
import { api } from '../services/api';

import '../styles/content.scss';
import { Header } from './Header';
interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface GenreProps {
  id: number;
}

export function Content(props:GenreProps) {
  
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [genere, setGenre] = useState<GenreResponseProps>();

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${props.id}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${props.id}`).then(response => {
      setGenre(response.data);
    })
  }, [props.id]);

  return (
    <div className="container">
        <Header title= {genere?.title ?? ""} />

        <main>
          <div className="movies-list">
            {movies.map(movie => (
              <MovieCard key ={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
            ))}
          </div>
        </main>
      </div>
  )
}