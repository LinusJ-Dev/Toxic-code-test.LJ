import axios from 'axios';
import { Show } from '../types/Show';
import { AppError } from '../types/error';

export const getPopularShows = async ( ): Promise<Show[] | AppError> => {
  try{
    const response = await axios.get<{ results: Show[] }>(`https://api.themoviedb.org/3/trending/tv/week`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_DB_ACCESS_TOKEN}`,
      },
    });
    
    return response.data.results as Show[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response) {
      return {
        httpCode: error.response.status,
        message: error.response.data?.status_message || 'An unknown error occurred',
      };
    } else {
      return {
        httpCode: 500,
        message: 'An unknown error occurred',
      };
    }
  }

};