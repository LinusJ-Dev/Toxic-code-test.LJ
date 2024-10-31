import { getPopularShows } from './services/shows';
import { Show } from './types/Show';
import Image from 'next/image';
import Link from 'next/link';

const Home = async () => {
  const shows: Show[] = await getPopularShows();

  return (
    <div className="shows-grid">
      {shows.map((show) => (
        <div key={show.id} className="show-card">
          <Link href={`/show/${show.id}`}>
              <Image
                src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                alt={show.name}
                width={200}
                height={300}
              />
              <div className="show-info">
                <h3>{show.name}</h3>
                <p>Rating: {show.vote_average}</p>
              </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Home;