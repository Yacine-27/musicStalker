import { useRef, useImperativeHandle, forwardRef } from "react";

const SearchBar = forwardRef(({ onQueryChange }, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current.focus(),
    clear: () => (inputRef.current.value = ""),
    inputEl: inputRef.current,
  }));

  return (
    <input
      ref={inputRef}
      type="text"
      onChange={(e) => onQueryChange(e.target.value)}
      placeholder="Search for an artist..."
      className="border p-2 rounded text-black"
    />
  );
});

export default SearchBar;
