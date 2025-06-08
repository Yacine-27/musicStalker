import SectionContainer from "./SectionContainer";
import { trimString } from "../util";
export default function Artists({
  artists,
  onRemoveArtist,
  onSelectArtist,
  isLoadingArtists,
}) {
  return (
    <SectionContainer name={"Artists"} isLoading={isLoadingArtists}>
      <ul>
        {artists.map((artist) => (
          <li key={artist.id}>
            {" "}
            {trimString(artist.name)}{" "}
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
    </SectionContainer>
  );
}
