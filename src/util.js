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
  const cliendId = "d305f47700744e969e3d7f444aa4740e";
  const cliendSecret = "80c36847dc6d4579a91590f786543313";

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: cliendId,
      client_secret: cliendSecret,
    }),
  });
  handleResponse(response);
  const token = await response.json();
  return token.access_token;
};

const getArtist = async (id, accessToken) => {
  if (!accessToken) throw new Error("No access token generated");
  const response = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
    headers: { Authorization: `Bearer  ${accessToken}` },
  });
  handleResponse(response);

  const json = await response.json();
  return json;
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
  return data;
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
  }));
};

export const findById = (id, array) => {
  return array.find((item) => item.id === id);
};
