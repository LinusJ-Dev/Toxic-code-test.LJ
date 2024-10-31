"use client"
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getShowDetails } from '../../services/showDetails';
import { Show } from '../../types/Show';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/app/components/Header';

import styles from './page.module.css';
import getLanguageName from '@/app/utils/languageName';

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
        const showData = await getShowDetails(showId as string);
        if ('httpCode' in showData) {
          setError(`Failed to load show details: ${showData.message}`);
        } else {
          setShow(showData);
        }
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


  return (
    <>
      <Header>
        <Link href="/">
          Back to Start Page
        </Link>
      </Header>
      <div className={styles.showDetail}>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          show && (
            <>
              <Image
                src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                alt={show.name}
                width={300}
                height={450}
                className={styles.showImage}
              />
              <div className={styles.showInfo}>
                <h1 className={styles.showTitle}>{show.name}</h1>
                {show.name !== show.original_name && <p className={styles.showOriginalTitle}>{show.original_name}</p>}
                <p>Rating: {show.vote_average}</p>
                {show.first_air_date && <p>First Air Date: {show.first_air_date}</p>}
                {show.overview && <p>{show.overview}</p>}
                {show.vote_count !== undefined && <p>Vote Count: {show.vote_count}</p>}
                {show.last_air_date && <p>Last Air Date: {show.last_air_date}</p>}
                {show.original_language && <p>Original Language: {getLanguageName(show.original_language)}</p>}
              </div>
            </>
          )
        )}
      </div>
    </>
  );
};

export default ShowDetailPage;