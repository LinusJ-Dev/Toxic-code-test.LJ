
import React from 'react';

import styles from './searchform.module.css';

interface SearchFormProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    handleSearch: () => void;
    setLanguage: (language: string) => void;
    languageOptions: { code: string; name: string }[];
    setAirDateFilter: (filter: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({searchQuery, setSearchQuery, handleSearch, setLanguage, languageOptions, setAirDateFilter}) => {
    return (
        <form className={styles.searchForm} >
            <label htmlFor="search">Search shows by title
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
            </label>
            <label htmlFor="language">Filter by language
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
            </label>
            <label htmlFor="airDate">Filter by air date
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
            </label>
        </form>
    )
}

export default SearchForm;