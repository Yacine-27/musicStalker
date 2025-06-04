import Logo from "./Logo";
import SearchBar from "./SearchBar";
import SearchResult from "./SearchResults";
import { searchArtist } from "../util";
import { useState, useRef } from "react";

export default function Nav({ accessToken, onAddArtist }) {
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
      const data = await searchArtist(query, accessToken, 3);
      setResults(
        data.artists.items.map((artist) => {
          return { name: artist.name, id: artist.id };
        })
      );
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
    <nav className="flex items-center justify-center bg-gray-800 py-4 px-2 text-amber-50">
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
        />
      </div>
    </nav>
  );
}
