import axios from 'axios';
import { Show } from '../types/Show';

export const getPopularShows = async ( ): Promise<Show[]> => {
  const response = await axios.get<{ results: Show[] }>(`https://api.themoviedb.org/3/trending/tv/week`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_DB_ACCESS_TOKEN}`,
    },
    params: {
      language: 'en-US',
      page: 1,
    },
  });

  return response.data.results as Show[];
};