'use client';

import { useState, useEffect, useCallback } from 'react';
import { getPopularShows } from './services/shows';
import { Show } from './types/Show';
import getLanguageName from './utils/languageName';
import Header from './components/header';
import ShowCard from './components/ShowCard';

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
        <form>
          <label htmlFor="search">Search shows by title</label>
          <input
            id="search"
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              handleSearch();
            }}
            placeholder="Search shows by title"
          />

          <label htmlFor="language">Filter by language</label>
          <select
            id="language"
            onChange={(e) => {
              setLanguage(e.target.value);
              handleSearch();
            }}
          >
            <option value="">Any Language</option>
            {languageOptions.map((option) => (
              <option key={option.code} value={option.code}>
                {option.name}
              </option>
            ))}
          </select>

          <label htmlFor="airDate">Filter by air date</label>
          <select
            id="airDate"
            onChange={(e) => {
              setAirDateFilter(e.target.value);
              handleSearch();
            }}
          >
            <option value="latest">Latest Air Date</option>
            <option value="oldest">Oldest Air Date</option>
          </select>
        </form>
      </Header>

      <div role="status" aria-live="polite" aria-busy={loading} style={{ position: 'absolute', left: '-9999px' }}>
        {updateMessage}
      </div>

      <div className="shows-grid" aria-busy={loading} aria-live="polite">
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
    </>
  );
};

export default Home;