import { useEffect, useState } from "react";
import {
  getToken,
  getArtistAlbums,
  getAlbumTracks,
  getArtistsInfo,
} from "./util";
import Search from "./components/Search";
import Artists from "./components/Artists";
import Albums from "./components/Albums";
import Tracks from "./components/Tracks";
import useSpotifyDetails from "./hooks/useSpotifyDetails";

function App() {
  const [token, setToken] = useState(null);
  const [artists, setArtists] = useState([]);
  const [localStorageLoaded, setLocalStorageLoaded] = useState(false);
  const [listenedSongs, setListenedSongs] = useState({});
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
  useEffect(() => {
    const fetchSavedArtists = async () => {
      const artistsIds = JSON.parse(savedArtists);
      const artists = await getArtistsInfo(artistsIds, token);
      setArtists(artists);
      setLocalStorageLoaded(true);
    };
    const savedArtists = localStorage.getItem("selectedArtists");
    if (token && savedArtists) {
      fetchSavedArtists();
    }
    const savedSongs = localStorage.getItem("listenedSongs");
    if (savedSongs) {
      setListenedSongs(JSON.parse(savedSongs));
    }
  }, [token]);
  useEffect(() => {
    if (localStorageLoaded) {
      const artistsIds = artists.map((artist) => artist.id);
      localStorage.setItem("selectedArtists", JSON.stringify(artistsIds));
    }
  }, [artists, localStorageLoaded]);

  useEffect(() => {
    if (localStorageLoaded) {
      localStorage.setItem("listenedSongs", JSON.stringify(listenedSongs));
    }
  }, [listenedSongs, localStorageLoaded]);

  const handleAddClick = (artist) => {
    const exists = artists.find((a) => a.id === artist.id);
    if (exists) {
      setArtists(artists.filter((a) => a.id !== artist.id));
    } else {
      setArtists([...artists, artist]);
    }
  };
  const handleToggleListened = (trackId) => {
    setListenedSongs({ ...listenedSongs, [trackId]: !listenedSongs[trackId] });
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
          onToggleListened={handleToggleListened}
          listenedSongs={listenedSongs}
        />
      )}
    </>
  );
}

export default App;
