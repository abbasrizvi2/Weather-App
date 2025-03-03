import { useState } from "react";

const Search = () => {
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);
  };

  return (
    <div className="w-11/12 border mx-auto mt-5">
      <input
        type="text"
        value={search}
        onChange={handleChange}
        className="w-12/12 mx-auto p-1 text-xl"
      />
    </div>
  );
};

export default Search;
