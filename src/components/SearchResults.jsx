export default function SearchResult({
  error,
  isLoading,
  results,
  onAddArtist,
}) {
  if (isLoading) return <p>Loading ...</p>;
  if (error) return <p>An error occured {error}</p>;
  return (
    <>
      {results.length > 0 && <h4> Search Results: </h4>}
      <ul>
        {results.map((result) => (
          <li key={result}>
            {result}{" "}
            <button
              onClick={() => {
                onAddArtist(result);
              }}
            >
              {" "}
              Add Artist{" "}
            </button>{" "}
          </li>
        ))}
      </ul>
    </>
  );
}
