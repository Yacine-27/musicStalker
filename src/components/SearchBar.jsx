import { useState } from "react";

export default function SearchBar({ onQueryChange }) {
  const [query, setQuery] = useState("");
  const handleQueryChange = (e) => {
    setQuery(e.target.value);
    onQueryChange(query);
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
