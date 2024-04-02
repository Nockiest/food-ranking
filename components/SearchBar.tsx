import React, { useState, ChangeEvent } from 'react';
import "./searchBar.css";
import searchIcon from "../svg/search.svg";

interface SearchBarProps {
  handleSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    handleSearch(value); // Call handleSearch with the updated value
  };

  return (
    <div className="search-bar">
      <img className="search-icon" src={searchIcon} alt="Search Icon" />
      <input
        className="search-input"
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchBar;
