import { useEffect, useState } from 'react';
import { MovieCard } from './MovieCard';
import { api } from '../services/api';

import '../styles/content.scss';
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
        <header>
          <span className="category">Categoria:<span> {genere?.title}</span></span>
        </header>

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