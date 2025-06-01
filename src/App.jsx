import { useEffect, useState } from "react";
import { getToken, getArtistAlbums, getAlbumTracks } from "./util";
import Search from "./components/Search";
import Artists from "./components/Artists";
import Albums from "./components/Albums";
import Tracks from "./components/Tracks";
import useSpotifyDetails from "./hooks/useSpotifyDetails";

function App() {
  const [token, setToken] = useState(null);
  const [artists, setArtists] = useState([]);

  const artistAlbums = useSpotifyDetails((id) => getArtistAlbums(token, id));
  const albumTracks = useSpotifyDetails((id) => getAlbumTracks(token, id));

  useEffect(() => {
    let ignore = false;
    const assignToken = async () => {
      const token = await getToken();
      if (!ignore) setToken(token);
    };
    assignToken();
    return () => {
      ignore = true;
    };
  }, []);

  const handleAddClick = (artist) => {
    const exists = artists.find((a) => a.id === artist.id);
    if (exists) {
      setArtists(artists.filter((a) => a.id !== artist.id));
    } else {
      setArtists([...artists, artist]);
    }
  };

  return (
    <>
      <Search accessToken={token} onAddArtist={handleAddClick} />
      <Artists
        artists={artists}
        onRemoveArtist={handleAddClick}
        onSelectArtist={(id) => artistAlbums.showDetails(id, artists)}
      />
      {artistAlbums.selectedItem && (
        <Albums
          albums={artistAlbums.data}
          isLoading={artistAlbums.isLoading}
          error={artistAlbums.error}
          onSelectAlbum={(id) => albumTracks.showDetails(id, artistAlbums.data)}
        />
      )}
      {albumTracks.selectedItem && (
        <Tracks
          tracks={albumTracks.data}
          isLoading={albumTracks.isLoading}
          error={albumTracks.error}
        />
      )}
    </>
  );
}

export default App;
