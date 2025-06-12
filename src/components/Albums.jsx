import SectionContainer from "./SectionContainer";
import AlbumCard from "./AlbumCard";

export default function Albums({ isLoading, error, albums, onSelectAlbum }) {
  return (
    <SectionContainer name={"Albums"} isLoading={isLoading} error={error}>
      <ul className="flex flex-col gap-2">
        {albums.map((album) => (
          <AlbumCard
            key={album.id}
            album={album}
            // listenRatio={getAlbumListenRatio(album, listenedSongs)}
            onSelect={() => {
              onSelectAlbum(album.id);
            }}
          />
        ))}
      </ul>
    </SectionContainer>
  );
}
