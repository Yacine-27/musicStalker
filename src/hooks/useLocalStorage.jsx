import { useEffect, useState } from "react";
import { getArtistsInfo } from "../util";

export default function useLocalStorage(token) {
  const [localStorageLoaded, setLocalStorageLoaded] = useState(false);
  const [isLoadingArtists, setIsLoadingArtists] = useState(true);
  const [artists, setArtists] = useState([]);
  const [listenedSongs, setListenedSongs] = useState([]);

  useEffect(() => {
    const fetchSavedData = async () => {
      const savedSongs = localStorage.getItem("listenedSongs");
      if (savedSongs) {
        setListenedSongs(JSON.parse(savedSongs));
      }

      const savedArtists = localStorage.getItem("selectedArtists");
      if (token && savedArtists) {
        const artistIds = JSON.parse(savedArtists);
        const artistData = await getArtistsInfo(artistIds, token);
        setArtists(artistData);
      }

      setIsLoadingArtists(false);
      setLocalStorageLoaded(true);
    };

    if (token) {
      fetchSavedData();
    }
  }, [token]);

  useEffect(() => {
    if (localStorageLoaded && artists.length > 0) {
      const artistIds = artists.map((artist) => artist.id);
      localStorage.setItem("selectedArtists", JSON.stringify(artistIds));
    }
  }, [artists, localStorageLoaded]);

  useEffect(() => {
    if (localStorageLoaded) {
      localStorage.setItem("listenedSongs", JSON.stringify(listenedSongs));
    }
  }, [listenedSongs, localStorageLoaded]);

  return {
    artists,
    listenedSongs,
    setArtists,
    setListenedSongs,
    isLoadingArtists,
  };
}
