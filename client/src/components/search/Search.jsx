import { useEffect, useRef, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";

const Search = () => {
  const [searchActive, setSearchActive] = useState(false);
  const handleSearchActive = () => {
    setSearchActive((prev) => !prev);
  };
  const inputRef = useRef(null);
  useEffect(() => {
    if (searchActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchActive]);
  return (
    <div
      className={`relative ${
        searchActive ? "w-[300px]" : "w-[30px]"
      } transition-all duration-200`}
    >
      <input
        ref={inputRef}
        type="text"
        disabled={!searchActive}
        autoFocus={!searchActive}
        className="w-full outline-0 px-3 py-1 rounded-lg disabled:bg-white"
        placeholder={searchActive ? "Search..." : ""}
      />
      {searchActive ? (
        <IoCloseOutline
          className="absolute right-2 top-0 translate-y-1/2 cursor-pointer"
          onClick={handleSearchActive}
        />
      ) : (
        <IoSearch
          className="absolute right-2 top-0 translate-y-1/2 cursor-pointer"
          onClick={handleSearchActive}
        />
      )}
    </div>
  );
};

export default Search;
