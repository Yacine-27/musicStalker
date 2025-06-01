export default function Artists({ artists, onRemoveArtist, onSelectArtist }) {
  return (
    <>
      {artists.length > 0 && <h3>Artists : </h3>}
      <ul>
        {artists.map((artist) => (
          <li key={artist.id}>
            {" "}
            {artist.name}{" "}
            <button
              type="button"
              onClick={() => {
                onSelectArtist(artist.id);
              }}
            >
              Show Albums
            </button>
            <button
              type="button"
              onClick={() => {
                onRemoveArtist(artist);
              }}
            >
              Remove
            </button>{" "}
          </li>
        ))}
      </ul>
    </>
  );
}
