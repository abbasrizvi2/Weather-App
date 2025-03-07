import { useState,useEffect, useCallback } from "react";
import { geoApiOptions, GEO_API_URL, dailyApi } from "../utils/apis";
import Card from "./Card";

// we use 2 apis here first api gives latitude,longitude and city name
// by using latitude and longitude of city we use 2nd api to get the weather info

const Search = () => {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState([])
  const [select, setSelect] = useState({})
  const [weather,setWeather] = useState({})

 
  const handleChange = (e) => {
    const values = e.target.value;
    setSearch(values);
  };

  const latitude = select.latitude //jo bhi city select ki h dropdown se uska object se latitude nikala
  const longitude = select.longitude

  useEffect(() => {
    if (!search || search === select.name) return; // Prevents fetching when search is empty or womn't render useEffect if item is selected and search data has been changed

    const fetchData = async () => {
      try {
        const response = await fetch(`${GEO_API_URL}/cities?namePrefix=${search}`, geoApiOptions); //apis.js me dkho url and option sath me kaam krenge mtlb kiu
        // if there is already get given by api so yiu have to fetch like this first use link than use key
        //jab bhi key wala api hota h usko aise hi fetch krte h
        const data = await response.json();
         // Safely check that data.data exists and is an array
        setCity(Array.isArray(data?.data) ? data?.data : []) //-->bcoz neeche city.length>0 h aur fast type krne se city array nhi mil rha h
        // **** Your debounced API calls are still pending
              //  ** Some thing in your code is temporarily setting city to undefined (not just an empty array)
              // **   When React tries to render, it sees undefined.length which causes the error
      }
      
      catch (err) {
        console.error("Error fetching data:", err);
        setCity([])
      }
    };

    // fetchData()

    const delayDebounceFn = setTimeout(() => {
      fetchData();
    }, 600);

    return () => clearTimeout(delayDebounceFn);
  }, [search,select.name]);
  

  useEffect(() => {
    if (!search|| !latitude || !longitude) return;
    const getApi = async () => {
      try {
        const api = await fetch(`${dailyApi}?lat=${latitude}&lon=${longitude}&appid=4ad624d3f52aa512e15f79240797c5a3`)
        const final = await api.json()
        console.log("weather of city is ", final)
        setWeather(final) //us selected ki details humne yaha save krli
      }
      catch (err) {
        console.error("Daily weather",err)
      }
    }


    const delayDebounceFn = setTimeout(() => {
      getApi();
    }, 400);

    return () => clearTimeout(delayDebounceFn);
    
  },[latitude,longitude,search])
  
  console.log(`selected city  data is ${JSON.stringify(select, null, 2)}`)
  // console.log(weather)
  console.log("cities are ", city)
  console.log(search)

  //*** Vey important
  //* if you want indent with object `${object}` it will show [object] so to convert object into string with
  // *this we use JSON.stringify((object),null,2(gives spacing)) */
  

  const handleClick = useCallback((id) => {
    const selected = city.find((city) => city.id === id ) //this will return an object (find is use to find the latest matched value)
    setSearch(`${selected?.name || ""}, ${selected?.country || ""}`)
    // setCity((prev)=>prev.length=0) // don't mutate to array like this after render react thinks that same array is 0
    setCity([]) //here a new array has been assigned to an react with an empty array (not mutating the already exist array)
    setSelect(selected) 
  },[city])

  

  return (
    <div>
    <div className="w-11/12 border mx-auto mt-5">
      <input
        type="text"
        value={search}
        onChange={handleChange}
        className="w-12/12 mx-auto p-1 text-xl"
      />
      {Array.isArray(city) && city.length>0 && city.map((city) => { //same issue typing fast will make screen blank see useEffect(setCity)
        return (
          <div key={city.id}
            className="hover:cursor-pointer"
            onClick = {()=>handleClick(city.id)}
           >
            {city.city} , {city.country}
          </div>
        )
      })
      }
      </div>
      <Card selectedCity={weather} />
      </div>
  );
};

export default Search;
