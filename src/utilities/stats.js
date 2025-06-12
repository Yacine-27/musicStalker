export const getAlbumListenRatio = (album, listenedSongs) => {
  // used set to improve performance.
  const songIdSet = new Set(album.map((song) => song.id));

  let listenedCount = 0;
  for (const id of listenedSongs) {
    if (songIdSet.has(id)) listenedCount++;
  }

  return (listenedCount / album.length).toFixed(1);
};
