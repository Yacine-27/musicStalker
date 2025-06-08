import { useEffect, useRef } from "react";
import SearchResult from "./SearchResult";
import AnimationContainer from "./AnimationContainer";

export default function SearchResults({
  error,
  isLoading,
  results,
  onAddArtist,
  inputRef,
  visible,
  setVisible,
  savedArtists,
}) {
  const resultsRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        resultsRef.current &&
        !resultsRef.current.contains(event.target) &&
        inputRef?.current?.inputEl &&
        !inputRef.current.inputEl.contains(event.target)
      ) {
        setVisible(false);
      }
    }

    function handleFocus() {
      if (results.length > 0) setVisible(true);
    }

    document.addEventListener("mousedown", handleClickOutside);
    inputRef?.current?.inputEl?.addEventListener("focus", handleFocus);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      inputRef?.current?.inputEl?.removeEventListener("focus", handleFocus);
    };
  }, [inputRef, results, setVisible]);

  const showBox = isLoading || error || (visible && results.length > 0);

  return (
    <div className="relative w-full" ref={resultsRef}>
      {showBox && (
        <AnimationContainer key={"searchResults"}>
          <div className="absolute left-0 right-0 border-2 border-zinc-400 rounded-lg shadow-lg z-20 mt-2 p-4 bg-zinc-800 text-zinc-200 w-full max-w-md min-h-[100px] overflow-hidden">
            <h4 className="font-semibold mb-2">Search Results:</h4>

            {isLoading ? (
              <div className="flex justify-center items-center h-full">
                <div className="h-6 w-6 border-4 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : error ? (
              <p className="text-red-500 text-sm text-center">
                An error occurred: {error.message}
              </p>
            ) : (
              <ul className="flex flex-col space-y-2 gap-2">
                {results.map((artist) => (
                  <SearchResult
                    key={artist.id}
                    name={artist.name}
                    image={artist.image}
                    isAdded={savedArtists.find((a) => a.id === artist.id)}
                    onAddArtist={() => onAddArtist(artist)}
                  />
                ))}
              </ul>
            )}
          </div>
        </AnimationContainer>
      )}
    </div>
  );
}
