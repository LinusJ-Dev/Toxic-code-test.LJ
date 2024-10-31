'use client';

import { useState, useEffect, useCallback } from 'react';
import { getPopularShows } from './services/shows';
import { Show } from './types/Show';
import getLanguageName from './utils/languageName';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import ShowCard from './components/ShowCard';

import styles from './page.module.css';

const Home = () => {
  const [shows, setShows] = useState<Show[]>([]);
  const [gatheredShows, setGatheredShows] = useState<Show[] | null>(null);
  const [airDateFilter, setAirDateFilter] = useState('latest');
  const [searchQuery, setSearchQuery] = useState('');
  const [language, setLanguage] = useState('');
  const [languageOptions, setLanguageOptions] = useState<{ code: string; name: string }[]>([]);
  const [updateMessage, setUpdateMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    const fetchShows = async () => {
      try {
        const popularShows = await getPopularShows();
        if ('httpCode' in popularShows) {
          setError(`Failed to shows: ${popularShows.message}`);
        } else {
          setShows(popularShows);
          setGatheredShows(popularShows);
          const languages = popularShows
            .map(show => show.original_language)
            .filter((value, index, self) => self.indexOf(value) === index)
            .map(language => ({ code: language, name: getLanguageName(language) }));
          setLanguageOptions(languages);
        }
      } catch (err) {
        if (err instanceof Error) {
          setError('Failed to load shows: ' + err.message);
        } else {
          setError('Failed to load shows');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchShows();
  }, []);

  const handleSearch = useCallback(async () => {
    setLoading(true);

    const filteredShows = (gatheredShows ?? []).filter(show => {
      const matchesQuery = searchQuery ? show.name.toLowerCase().includes(searchQuery.toLowerCase()) : true;
      const matchesLanguage = language ? show.original_language === language : true;
      return matchesQuery && matchesLanguage;
    });

    const sortedShows = filteredShows.sort((a, b) => {
      if (airDateFilter === 'latest') {
        return new Date(b.first_air_date).getTime() - new Date(a.first_air_date).getTime();
      } else {
        return new Date(a.first_air_date).getTime() - new Date(b.first_air_date).getTime();
      }
    });

    setShows(sortedShows);
    setUpdateMessage("Results updated");
    setLoading(false);

  }, [searchQuery, language, airDateFilter, gatheredShows]);

  useEffect(() => {
    handleSearch();
  }, [searchQuery, language, airDateFilter, handleSearch]);


  return (
    <>
      <Header>
        <SearchForm
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
          setLanguage={setLanguage}
          languageOptions={languageOptions}
          setAirDateFilter={setAirDateFilter}
        />
      </Header>

      <div className={styles.gridWrapper}>
        <div role="status" aria-live="polite" aria-busy={loading} style={{ position: 'absolute', left: '-9999px' }}>
          {updateMessage}
        </div>
        <h1 className={styles.title}>Popular TV series</h1>
        <div className={styles.showsGrid} aria-busy={loading} aria-live="polite">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : shows.length === 0 ? (
            <p>No shows found. Please adjust your search criteria.</p>
          ) : (
            shows.map((show) => (
              <ShowCard
                show={show}
                key={show.id}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Home;