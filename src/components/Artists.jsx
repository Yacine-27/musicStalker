import SectionContainer from "./SectionContainer";
import ArtistCard from "./ArtistCard";

export default function Artists({
  artists,
  onRemoveArtist,
  onSelectArtist,
  isLoadingArtists,
}) {
  return (
    <SectionContainer name={"Artists"} isLoading={isLoadingArtists}>
      <ul className="flex flex-col gap-2">
        {artists.map((artist) => (
          <ArtistCard
            key={artist.id}
            artist={artist}
            onSelect={() => {
              onSelectArtist(artist.id);
            }}
            onRemove={() => {
              onRemoveArtist(artist);
            }}
          />
        ))}
      </ul>
    </SectionContainer>
  );
}
