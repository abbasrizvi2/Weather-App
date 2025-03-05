import { useState,useEffect } from "react";
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
    if (!search) return; // Prevents fetching when search is empty

    const fetchData = async () => {
      try {
        const response = await fetch(`${GEO_API_URL}/cities?namePrefix=${search}`, geoApiOptions); //apis.js me dkho url and option sath me kaam krenge mtlb kiu
        // if there is already get given by api so yiu have to fetch like this first use link than use key
        //jab bhi key wala api hota h usko aise hi fetch krte h
        const data = await response.json();
        setCity(data?.data)
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    // fetchData()

    const delayDebounceFn = setTimeout(() => {
      fetchData();
    }, 600);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);
  

  useEffect(() => {
    if (!search) return;
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
  
  // console.log(`selected city  data is ${JSON.stringify(select, null, 2)}`)
  console.log(weather)
  console.log("cities are ", city)

  //*** Vey important
  //* if you want indent with object `${object}` it will show [object] so to convert object into string with
  // *this we use JSON.stringify((object),null,2(gives spacing)) */
  

  const handleClick = (id) => {
    const selected = city.find((city) => city.id === id ) //this will return an object (find is use to find the latest matched value)
    setSearch(selected.name)
    setCity((prev) => prev.length = 0)
    setSelect(selected) 
  }

  

  return (
    <div>
    <div className="w-11/12 border mx-auto mt-5">
      <input
        type="text"
        value={search}
        onChange={handleChange}
        className="w-12/12 mx-auto p-1 text-xl"
      />
      {city.length > 0 && city.map((city) => {
        return (
          <div key={city.id}
            className="hover:cursor-pointer"
            onClick = {()=>handleClick(city.id)}
           >
            {city.city}
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
