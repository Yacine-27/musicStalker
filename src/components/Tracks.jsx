import Track from "./Track";
export default function Tracks({
  tracks,
  isLoading,
  error,
  listenedSongs,
  onToggleListened,
}) {
  if (isLoading) return <p>Loading tracks ...</p>;
  if (error) return <p>{error.message}</p>;
  return (
    <>
      <h4>Tracks: </h4>
      <ul>
        {tracks.map((track) => (
          <Track
            key={track.id}
            track={track}
            isListened={listenedSongs[track.id] ? true : false}
            onToggleListened={() => {
              onToggleListened(track.id);
            }}
          />
        ))}
      </ul>
    </>
  );
}
