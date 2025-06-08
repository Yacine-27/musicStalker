import SectionContainer from "./SectionContainer";
import TrackCard from "./TrackCard";
export default function Tracks({
  tracks,
  isLoading,
  error,
  listenedSongs,
  onToggleListened,
}) {
  return (
    <SectionContainer name={"Tracks"} isLoading={isLoading} error={error}>
      <ul className="flex flex-col gap-2">
        {tracks.map((track) => (
          <TrackCard
            key={track.id}
            track={track}
            isListened={listenedSongs[track.id] ? true : false}
            onToggle={() => {
              onToggleListened(track.id);
            }}
          />
        ))}
      </ul>
    </SectionContainer>
  );
}
