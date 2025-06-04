import { useEffect, useRef } from "react";

export default function SearchResult({
  error,
  isLoading,
  results,
  onAddArtist,
  inputRef,
  visible,
  setVisible,
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

  if (isLoading) return <p>Loading ...</p>;
  if (error) return <p>An error occurred: {error.message}</p>;

  return (
    <div className="relative" ref={resultsRef}>
      {visible && results.length > 0 && (
        <div className="absolute border rounded-lg shadow-lg z-20 mt-6 mr-3 p-2 bg-white text-black">
          <h4 className="font-semibold mb-2">Search Results:</h4>
          <ul className="w-55">
            {results.map((artist) => (
              <li
                key={artist.id}
                className="flex justify-between items-center mb-1"
              >
                <span>{artist.name}</span>
                <button
                  onClick={() => onAddArtist(artist)}
                  className="text-blue-500 hover:underline"
                >
                  Add Artist
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
