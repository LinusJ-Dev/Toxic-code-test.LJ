'use client';

import { useState, useEffect, useCallback } from 'react';
import { getPopularShows } from './services/shows';
import { Show } from './types/Show';
import Image from 'next/image';
import Link from 'next/link';

const Home = () => {
  const [shows, setShows] = useState<Show[]>([]);
  const [gatheredShows, setGatheredShows] = useState<Show[]>([]);
  const [airDateFilter, setAirDateFilter] = useState('latest');
  const [searchQuery, setSearchQuery] = useState('');
  const [language, setLanguage] = useState('');
  const [languageOptions, setLanguageOptions] = useState<{ code: string; name: string }[]>([]);

  useEffect(() => {
    const fetchShows = async () => {
      const popularShows = await getPopularShows();
      setShows(popularShows);
      setGatheredShows(popularShows);
      const languages = popularShows
        .map(show => show.original_language)
        .filter((value, index, self) => self.indexOf(value) === index)
        .map(language => ({ code: language, name: language }));
      setLanguageOptions(languages);
    };

    fetchShows();
  }, []);

  const handleSearch = useCallback(async () => {

    const filteredShows = gatheredShows.filter(show => {
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
  }, [searchQuery, language, airDateFilter, gatheredShows]);


  useEffect(() => {
    handleSearch();
  }, [searchQuery, language, airDateFilter, handleSearch]);


  return (
    <>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
            handleSearch();
          }}
          placeholder="Search shows by title"
        />
        <select
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
        <select
          onChange={(e) => {
            setAirDateFilter(e.target.value);
            handleSearch();
          }}
        >
          <option value="latest">Latest Air Date</option>
          <option value="oldest">Oldest Air Date</option>
        </select>
        {/* <button type="submit">Search</button> */}
      </form>
      <div className="shows-grid">
        {shows.map((show) => (
          <div key={show.id} className="show-card">
            <Link href={`/show/${show.id}`}>
              {show.poster_path && (
                <Image
                  src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                  alt={show.name}
                  width={200}
                  height={300}
                />
              )}
              <div className="show-info">
                <h2>{show.name}</h2>
                {show.name !== show.original_name && <p>{show.original_name}</p>}
                <p>Rating: {show.vote_average}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;