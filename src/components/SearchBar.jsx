import { useRef, useImperativeHandle, forwardRef } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = forwardRef(({ onQueryChange }, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current.focus(),
    clear: () => (inputRef.current.value = ""),
    inputEl: inputRef.current,
  }));

  return (
    <div className="relative w-full">
      <FaSearch
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 pointer-events-none"
        size={18}
      />
      <input
        ref={inputRef}
        type="text"
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="Search for an artist ..."
        className="w-full pl-10 p-2 rounded-lg bg-zinc-800 text-zinc-200 focus:border-2 focus:border-zinc-200"
      />
    </div>
  );
});

export default SearchBar;
