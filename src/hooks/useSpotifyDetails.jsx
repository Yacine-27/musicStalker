import { useState } from "react";
export default function useSpotifyDetails(fetchFn) {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const showDetails = async (id, list) => {
    const selected = list.find((item) => item.id === id);
    if (!selected) return;
    setSelectedItem(selected);
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetchFn(id);
      setData(result);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const clearDetails = () => {
    setSelectedItem(null);
    setData([]);
    setError(null);
    setIsLoading(false);
  };

  return { data, selectedItem, isLoading, error, showDetails, clearDetails };
}
