import { useState } from "react";
import { findById } from "../util";

const useSpotifyDetails = (fetchFn) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const showDetails = async (id, sourceList = []) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetchFn(id);
      setData(response);
      setSelectedItem(findById(id, sourceList));
    } catch (e) {
      setError(e);
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    selectedItem,
    data,
    isLoading,
    error,
    showDetails,
  };
};

export default useSpotifyDetails;
