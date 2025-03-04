import { useState,useEffect } from "react";
import { geoApiOptions,GEO_API_URL,dailyApi } from "../utils/apis";

const Search = () => {
  const [search, setSearch] = useState("");
  const [latitude,setLatitude] = useState([])
  const [longitude,setLongitude] = useState([])
  const [city,setCity] = useState([])


  // console.log(latitude)
  // console.log(longitude)
  // console.log(city)

  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);
  };

 console.log("value of search is ", search)
  useEffect(() => {
    if (!search) return; // Prevents fetching when search is empty

    const fetchData = async () => {
      try {
        const response = await fetch(`${GEO_API_URL}/cities?namePrefix=${search}`, geoApiOptions);
        const data = await response.json();
        setLatitude(data?.data.map((city)=>city.latitude)[0])
        setLongitude(data?.data.map((city)=>city.longitude)[0])
        setCity(data?.data.map((city)=>city.city)[0])
        // console.log(data?.data.map((city)=>city.latitude));
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    // fetchData()

    const delayDebounceFn = setTimeout(() => {
      fetchData();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);
  

  useEffect(() => {
    if (!search) return;
    const getApi = async () => {
      try {
        const api = await fetch(`${dailyApi}?lat=${latitude}&lon=${longitude}&appid=4ad624d3f52aa512e15f79240797c5a3`)
        const final = await api.json()
        console.log(final)
      }
      catch (err) {
        console.error("Daily weather",err)
      }
    }

    // getApi()
    const delayDebounceFn = setTimeout(() => {
      getApi();
    }, 400);

    return () => clearTimeout(delayDebounceFn);
    
  },[latitude,longitude,search])
  


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
