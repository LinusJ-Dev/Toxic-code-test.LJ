import axios from 'axios';
import { Show } from '../types/Show';

export const getShowDetails = async (showId: string): Promise<Show> => {
  const response = await axios.get(`https://api.themoviedb.org/3/tv/${showId}?language=en-US`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_DB_ACCESS_TOKEN}`,
    },
    
  });
  return response.data as Show;
};