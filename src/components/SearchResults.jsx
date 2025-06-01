export default function SearchResult({
  error,
  isLoading,
  results,
  onAddArtist,
}) {
  if (isLoading) return <p>Loading ...</p>;
  if (error) return <p>An error occured {error.message}</p>;
  return (
    <>
      {results.length > 0 && <h4> Search Results: </h4>}
      <ul>
        {results.map((artist) => (
          <li key={artist.id}>
            {artist.name}{" "}
            <button
              onClick={() => {
                onAddArtist({ name: artist.name, id: artist.id });
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
