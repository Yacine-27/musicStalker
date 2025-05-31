import SearchBar from "./SearchBar";
import SearchResult from "./SearchResults";
import { searchArtist } from "../../util";
import { useState } from "react";

export default function Search({ accessToken, onAddArtist }) {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleQueryChange = async (query) => {
    try {
      if (query.length < 3) {
        setResults([]);
        return;
      }
      const data = await searchArtist(query, accessToken, 3);
      setResults(data.artists.items.map((artist) => artist.name));
      setIsLoading(false);
    } catch (e) {
      setError(e);
      setIsLoading(false);
    }
  };
  return (
    <div>
      <SearchBar onQueryChange={handleQueryChange} />
      <SearchResult
        isLoading={isLoading}
        error={error}
        results={results}
        onAddArtist={onAddArtist}
      />
    </div>
  );
}
