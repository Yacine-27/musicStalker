import Logo from "./Logo";
import SearchBar from "./SearchBar";
import SearchResult from "./SearchResults";
import Utilities from "./Utilities";
import { searchArtist } from "../util";
import { useState, useRef, useEffect } from "react";

export default function Nav({
  accessToken,
  onAddArtist,
  savedArtists,
  showComponents,
  onShowComponentChange,
}) {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showUtilities, setShowUtilities] = useState(false);

  const logoWrapperRef = useRef();
  const utilitiesRef = useRef();
  const searchBarRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        logoWrapperRef.current &&
        !logoWrapperRef.current.contains(event.target)
      ) {
        setShowUtilities(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    <nav className="flex items-center justify-around py-4 px-2 relative">
      <div ref={logoWrapperRef} className="relative">
        <div onClick={() => setShowUtilities((prev) => !prev)}>
          <Logo />
        </div>
        {showUtilities && (
          <div
            ref={utilitiesRef}
            className="absolute sm:left-1/2 top-full mt-2 transform sm:-translate-x-1/2 z-10 
                 bg-zinc-800 shadow-lg rounded-lg px-4 py-3 min-w-[200px]"
          >
            <Utilities
              showComponents={showComponents}
              onShowComponentChange={(name) => {
                onShowComponentChange(name);
                setShowUtilities(false);
              }}
            />
          </div>
        )}
      </div>

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
