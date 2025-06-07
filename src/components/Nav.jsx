import Logo from "./Logo";
import SearchBar from "./SearchBar";
import SearchResult from "./SearchResults";
import { searchArtist } from "../util";
import { useState, useRef } from "react";

export default function Nav({ accessToken, onAddArtist, savedArtists }) {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const searchBarRef = useRef();

  const handleQueryChange = async (query) => {
    try {
      if (query.length < 3) {
        setResults([]);
        return;
      }
      setIsLoading(true);
      const artists = await searchArtist(query, accessToken, 3);
      setResults(artists);
      setIsVisible(true);
      setIsLoading(false);
    } catch (e) {
      setError(e);
      setIsLoading(false);
    }
  };

  const handleAddArtist = (artist) => {
    onAddArtist(artist);
    setResults([]);
    setIsVisible(false);
    searchBarRef.current?.clear();
  };

  return (
    <nav className="flex items-center justify-around py-4 px-2">
      <Logo />
      <div className="flex flex-col justify-center relative">
        <SearchBar ref={searchBarRef} onQueryChange={handleQueryChange} />
        <SearchResult
          inputRef={searchBarRef}
          isLoading={isLoading}
          error={error}
          results={results}
          visible={isVisible}
          setVisible={setIsVisible}
          onAddArtist={handleAddArtist}
          savedArtists={savedArtists}
        />
      </div>
    </nav>
  );
}
