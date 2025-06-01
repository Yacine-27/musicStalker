import { useEffect, useState } from "react";
import { getToken } from "./util";
import Search from "./components/Search";
import Artists from "./components/Artists";
import Albums from "./components/Albums";
import { useArtistAlbums } from "./hooks/useArtistAlbums";

function App() {
  const [token, setToken] = useState(null);
  const [artists, setArtists] = useState([]);

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

  const {
    selectedArtist,
    albums,
    isAlbumsLoading,
    showAlbumsError,
    showArtistAlbums,
  } = useArtistAlbums(token, artists);

  const handleAddClick = (artist) => {
    const isAdded = artists.find((a) => a.id === artist.id);
    setArtists(
      isAdded ? artists.filter((a) => a.id !== artist.id) : [...artists, artist]
    );
  };

  return (
    <>
      <Search accessToken={token} onAddArtist={handleAddClick} />
      <Artists
        artists={artists}
        onRemoveArtist={handleAddClick}
        onSelectArtist={showArtistAlbums}
      />
      {selectedArtist && (
        <Albums
          isAlbumsLoading={isAlbumsLoading}
          showAlbumsError={showAlbumsError}
          albums={albums}
        />
      )}
    </>
  );
}

export default App;
