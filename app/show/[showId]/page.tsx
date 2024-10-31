"use client"
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getShowDetails } from '../../services/showDetails';
import { Show } from '../../types/Show';
import Image from 'next/image';

const ShowDetailPage = () => {
  const { showId } = useParams();
  const [show, setShow] = useState<Show | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!showId) {
      setError('No show ID provided');
      setLoading(false);
      return;
    }

    const fetchDetails = async () => {
      try {
        console.log('Fetching show details...');
        const showData = await getShowDetails(showId as string);
        console.log('found show!');
        console.log(showData);
        setShow(showData);
      } catch (err) {
        if (err instanceof Error) {
          setError('Failed to load show details: ' + err.message);
        } else {
          setError('Failed to load show details');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [showId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!show) return <p>No show found.</p>;

  return (

    
    <div className="show-detail">
      <h1>{show.name}</h1>
      <Image
        src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
        alt={show.name}
        width={300}
        height={450}
      />
      <p>Rating: {show.vote_average}</p>
      <p>First Air Date: {show.first_air_date}</p>
      <p>{show.overview}</p>
    </div>
  );
};

export default ShowDetailPage;