import SectionContainer from "./SectionContainer";
import Track from "./Track";
export default function Tracks({
  tracks,
  isLoading,
  error,
  listenedSongs,
  onToggleListened,
}) {
  return (
    <SectionContainer name={"Tracks"} isLoading={isLoading} error={error}>
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
    </SectionContainer>
  );
}
