const handleResponse = (response) => {
  if (response.status >= 400 && response.status <= 500) {
    throw new Error(`Oops, a server error occurred (${response.status})`);
  }
  if (response.status >= 500) {
    throw new Error(`Oops, Spotify servers are down`);
  }
  return response;
};

export const getToken = async () => {
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_CLIENT_SECRET;
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: clientId,
      client_secret: clientSecret,
    }),
  });
  handleResponse(response);
  const token = await response.json();
  return token.access_token;
};

const getArtist = async (id, accessToken) => {
  if (!accessToken) throw new Error("No access token generated");
  const response = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  handleResponse(response);

  const data = await response.json();
  return {
    name: data.name,
    id: data.id,
    image: getSmallestImg(data.images) ?? "",
  };
};

export const getArtistsInfo = async (artistsIds, token) => {
  const promises = artistsIds.map((id) => getArtist(id, token));
  const artists = await Promise.all(promises);
  return artists;
};

const search = async (query, accessToken) => {
  const response = await fetch(`https://api.spotify.com/v1/search?q=${query}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  handleResponse(response);

  const json = await response.json();
  return json;
};

export const searchArtist = async (query, accessToken, limit) => {
  if (!accessToken) return;
  if (!query) return;
  const data = await search(
    `${encodeURIComponent(query)}&type=artist&limit=${limit}`,
    accessToken
  );
  const artists = data.artists.items.map((artist) => ({
    name: artist.name,
    id: artist.id,
    image: getSmallestImg(artist.images) ?? "",
  }));
  return artists;
};

const getSmallestImg = (images = []) => {
  if (!Array.isArray(images) || images.length === 0) return "";

  const smallest = images
    .filter((img) => img.url && typeof img.width === "number")
    .reduce((min, img) => (img.width < min.width ? img : min), images[0]);

  return smallest?.url || "";
};

export const getArtistAlbums = async (accessToken, id) => {
  const response = await fetch(
    `https://api.spotify.com/v1/artists/${id}/albums`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
  const data = await response.json();
  return data.items.map((album) => ({
    id: album.id,
    name: album.name,
  }));
};

export const getAlbumTracks = async (token, albumId) => {
  const response = await fetch(
    `https://api.spotify.com/v1/albums/${albumId}/tracks`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  return data.items.map((track) => ({
    id: track.id,
    name: track.name,
    listenedTo: false,
  }));
};

export const findById = (id, array) => {
  return array.find((item) => item.id === id);
};

export const trimString = (string = "") => {
  if (string.length > 30) {
    return string.slice(0, 27).padEnd(30, ".");
  }
  return string;
};
