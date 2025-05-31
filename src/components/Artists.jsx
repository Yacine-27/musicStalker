export default function Artists({ artists, onAddArtist }) {
  return (
    <>
      {artists.length > 0 && <h3>Artists : </h3>}
      <ul>
        {artists.map((artist) => (
          <li key={artist}>
            {" "}
            {artist}{" "}
            <button
              onClick={() => {
                onAddArtist(artist);
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
