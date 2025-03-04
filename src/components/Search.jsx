import { useState,useEffect } from "react";
import { geoApiOptions,GEO_API_URL } from "../utils/apis";

const Search = () => {
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);
  };

 console.log("value of search is ", search)
  useEffect(() => {
    // if (!search) return; // Prevents fetching when search is empty

    const fetchData = async () => {
      try {
        const response = await fetch(`${GEO_API_URL}/cities?namePrefix=${search}`, geoApiOptions);
        const data = await response.json();
        console.log(data?.data.map((city)=>city.name));
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    // fetchData()

    const delayDebounceFn = setTimeout(() => {
      fetchData();
    }, 100);

    return () => clearTimeout(delayDebounceFn);
  }, );

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


// import { useState } from "react";
// import { AsyncPaginate } from "react-select-async-paginate";

// const Search = ({ onSearchChange }) => {
//   const [search, setSearch] = useState(null);

//   const loadOptions = (inputValue) => {
//     return fetch(
//       `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
//       geoApiOptions
//     )
//       .then((response) => response.json())
//       .then((response) => {
//         return {
//           options: response.data.map((city) => {
//             return {
//               value: `${city.latitude} ${city.longitude}`,
//               label: `${city.name}, ${city.countryCode}`,
//             };
//           }),
//         };
//     })
//     .catch((err) => console.log(err));
//   };

//   const handleOnChange = (searchData) => {
//     setSearch(searchData);
//     onSearchChange(searchData);
//   };

//   return (
//     <AsyncPaginate
//       placeholder="Search for city"
//       debounceTimeout={600}
//       value={search}
//       onChange={handleOnChange}
//       loadOptions={loadOptions}
//     />
//   );
// };

// export default Search;
