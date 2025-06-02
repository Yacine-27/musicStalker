import { useState } from "react";

export default function SearchBar({ onQueryChange }) {
  const [query, setQuery] = useState("");
  const handleQueryChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onQueryChange(newQuery);
  };
  return (
    <form
      method="GET"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <input
        type="text"
        id="query"
        name="query"
        placeholder="search for an artist ..."
        value={query}
        onChange={handleQueryChange}
      />
    </form>
  );
}
