import { useEffect, useState } from "react";
import { getToken } from "../util";
import Search from "./components/Search";
import Artists from "./components/Artists";
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
  const handleAddClick = (artist) => {
    const isAdded = artists.find((a) => a === artist);
    if (!isAdded) setArtists([...artists, artist]);
    else {
      setArtists(artists.filter((a) => a !== artist));
    }
  };
  return (
    <>
      <Search accessToken={token} onAddArtist={handleAddClick} />
      <Artists artists={artists} onAddArtist={handleAddClick} />
    </>
  );
}

export default App;
