import { useEffect, useState } from "react";
import { getArtistsInfo } from "../util";
export default function useLocalStorage(
  token,
  artists,
  listenedSongs,
  setArtists,
  setListenedSongs
) {
  const [localStorageLoaded, setLocalStorageLoaded] = useState(false);

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
  }, [setArtists, setListenedSongs, token]);
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
}
