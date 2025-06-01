import { useState } from "react";
import { getArtistAlbums, findById } from "../util";

export function useArtistAlbums(token, artist) {
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [isAlbumsLoading, setIsAlbumsLoading] = useState(false);
  const [showAlbumsError, setShowAlbumsError] = useState(null);
  const [albums, setAlbums] = useState([]);

  const showArtistAlbums = async (id) => {
    try {
      setIsAlbumsLoading(true);
      setShowAlbumsError(null);
      const data = await getArtistAlbums(token, id);
      setSelectedArtist(findById(id, artist));
      setAlbums(
        data.items.map((album) => ({ name: album.name, id: album.id }))
      );
    } catch (e) {
      setShowAlbumsError(e);
    } finally {
      setIsAlbumsLoading(false);
    }
  };

  return {
    selectedArtist,
    albums,
    isAlbumsLoading,
    showAlbumsError,
    showArtistAlbums,
  };
}
