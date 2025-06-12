import { useEffect, useState } from "react";
import { getToken, getArtistAlbums, getAlbumTracks } from "./utilities/util";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Artists from "./components/Artists";
import Albums from "./components/Albums";
import Tracks from "./components/Tracks";
import useSpotifyDetails from "./hooks/useSpotifyDetails";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [token, setToken] = useState(null);

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
      const updatedArtists = artists.filter((a) => a.id !== artist.id);
      setArtists(updatedArtists);

      if (artistAlbums.selectedItem?.id === artist.id) {
        artistAlbums.clearDetails();
        albumTracks.clearDetails();
      }
    } else {
      setArtists([...artists, artist]);
    }
  };

  const handleToggleListened = (trackId) => {
    const exists = listenedSongs.find((id) => id === trackId);
    if (exists) setListenedSongs(listenedSongs.filter((id) => id !== trackId));
    else {
      setListenedSongs([...listenedSongs, trackId]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-200">
      <Nav
        accessToken={token}
        onAddArtist={handleAddClick}
        savedArtists={artists}
      />
      {!artists || artists.length === 0 ? (
        <Header />
      ) : (
        <main className="flex flex-grow overflow-x-auto gap-4 px-4 py-6 sm:justify-center">
          <div className="min-w-[300px] w-full sm:w-[320px]">
            <Artists
              artists={artists}
              isLoadingArtists={isLoadingArtists}
              onRemoveArtist={handleAddClick}
              onSelectArtist={(id) => {
                artistAlbums.showDetails(id, artists);
                albumTracks.clearDetails();
              }}
            />
          </div>
          {artistAlbums.selectedItem && (
            <div className="min-w-[300px] w-full sm:w-[320px]">
              <Albums
                albums={artistAlbums.data}
                listenedSongs={listenedSongs}
                isLoading={artistAlbums.isLoading}
                error={artistAlbums.error}
                onSelectAlbum={(id) =>
                  albumTracks.showDetails(id, artistAlbums.data)
                }
              />
            </div>
          )}
          {albumTracks.selectedItem && (
            <div className="min-w-[300px] w-full sm:w-[320px]">
              <Tracks
                tracks={albumTracks.data}
                isLoading={albumTracks.isLoading}
                error={albumTracks.error}
                onToggleListened={handleToggleListened}
                listenedSongs={listenedSongs}
              />
            </div>
          )}
        </main>
      )}
    </div>
  );
}

export default App;
