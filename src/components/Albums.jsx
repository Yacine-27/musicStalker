export default function Albums({ isAlbumsLoading, showAlbumsError, albums }) {
  if (showAlbumsError) return <p>{showAlbumsError.message}</p>;
  if (isAlbumsLoading) return <p>Loading albums ...</p>;
  return (
    <>
      <h4>Albums: </h4>
      <ul>
        {albums.map((album) => (
          <li key={album.id}>{album.name}</li>
        ))}
      </ul>
    </>
  );
}
