export default function Tracks({ tracks, isLoading, error }) {
  if (isLoading) return <p>Loading tracks ...</p>;
  if (error) return <p>{error.message}</p>;
  return (
    <>
      <h4>Tracks: </h4>
      <ul>
        {tracks.map((track) => (
          <ul key={track.id}> {track.name} </ul>
        ))}
      </ul>
    </>
  );
}
