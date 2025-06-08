import { useEffect, useState } from "react";
import { getToken, getArtistAlbums, getAlbumTracks } from "./util";
import { AnimatePresence } from "framer-motion";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Artists from "./components/Artists";
import Albums from "./components/Albums";
import Tracks from "./components/Tracks";
import useSpotifyDetails from "./hooks/useSpotifyDetails";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [token, setToken] = useState(null);
  const [showComponents, setShowComponents] = useState({
    artists: true,
    albums: true,
    songs: true,
  });
  const artistAlbums = useSpotifyDetails((id) => getArtistAlbums(token, id));
  const albumTracks = useSpotifyDetails((id) => getAlbumTracks(token, id));
  const {
    artists,
    listenedSongs,
    setArtists,
    setListenedSongs,
    isLoadingArtists,
  } = useLocalStorage(token);

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
  const handleToggleListened = (trackId) => {
    setListenedSongs({ ...listenedSongs, [trackId]: !listenedSongs[trackId] });
  };
  const handleShowComponentChange = (component) => {
    setShowComponents({
      ...showComponents,
      [component]: !showComponents[component],
    });
    console.log(showComponents);
  };
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200">
      <Nav
        accessToken={token}
        onAddArtist={handleAddClick}
        savedArtists={artists}
        showComponents={showComponents}
        onShowComponentChange={handleShowComponentChange}
      />
      {!artists || artists.length === 0 ? (
        <Header />
      ) : (
        <div className="flex flex-wrap gap-2 justify-around">
          {showComponents.artists && (
            <Artists
              artists={artists}
              isLoadingArtists={isLoadingArtists}
              onRemoveArtist={handleAddClick}
              onSelectArtist={(id) => artistAlbums.showDetails(id, artists)}
            />
          )}
          {showComponents.albums && artistAlbums.selectedItem && (
            <Albums
              albums={artistAlbums.data}
              isLoading={artistAlbums.isLoading}
              error={artistAlbums.error}
              onSelectAlbum={(id) =>
                albumTracks.showDetails(id, artistAlbums.data)
              }
            />
          )}
          {showComponents.songs && albumTracks.selectedItem && (
            <Tracks
              tracks={albumTracks.data}
              isLoading={albumTracks.isLoading}
              error={albumTracks.error}
              onToggleListened={handleToggleListened}
              listenedSongs={listenedSongs}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default App;
