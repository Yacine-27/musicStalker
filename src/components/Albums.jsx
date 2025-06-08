import { trimString } from "../util";
import SectionContainer from "./SectionContainer";
export default function Albums({ isLoading, error, albums, onSelectAlbum }) {
  return (
    <SectionContainer name={"Albums"} isLoading={isLoading} error={error}>
      <ul>
        {albums.map((album) => (
          <li key={album.id}>
            {trimString(album.name)}{" "}
            <button
              type="button"
              onClick={() => {
                onSelectAlbum(album.id);
              }}
            >
              Show songs
            </button>
          </li>
        ))}
      </ul>
    </SectionContainer>
  );
}
