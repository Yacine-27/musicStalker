import { useState } from "react";
import { LuListMusic } from "react-icons/lu";

export default function SearchBar({ onQueryChange }) {
  const [query, setQuery] = useState("");
  const handleQueryChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onQueryChange(newQuery);
  };
  return (
    <nav className="flex justify-around bg-slate-900 text-amber-50 py-2 shadow-2xl">
      <div className="flex gap-1 items-center cursor-pointer text-slate-200">
        <LuListMusic className="text-xl" />
        <h3>MusicStalker</h3>
      </div>
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
          className="border-1 border-slate-600 px-2 rounded-xl flex justify-center bg-slate-800"
        />
      </form>
    </nav>
  );
}
