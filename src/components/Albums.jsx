export default function Albums({ isLoading, error, albums, onSelectAlbum }) {
  if (error) return <p>{error.message}</p>;
  if (isLoading) return <p>Loading albums ...</p>;
  return (
    <>
      <h4>Albums: </h4>
      <ul>
        {albums.map((album) => (
          <li key={album.id}>
            {album.name}{" "}
            <button
              type="button"
              onClick={() => {
                onSelectAlbum(album.id);
              }}
            >
              Show songs
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
