export default function Card({ selectedCity = {} }) {

  const weatherDescription = selectedCity?.weather?.length ? selectedCity.weather[0].description : "No Weather Data";
  const City = selectedCity?.name || "City"
  return (
    <div>
          <div className="border border-black w-[400px] h-[250px] mt-16 mx-auto bg-gray-800 text-white p-2 text-xl
      rounded-xl shadow-black drop-shadow-xl">
              <div className="flex justify-around mt-5">
                  <div>
            <div>{City}</div>
            <div>{weatherDescription}</div>
                  </div>
                  <div>
                      Cloud Image
                  </div>
              </div>
              <div className="flex justify-around mt-3">
                  <div>22 C</div>
                  {/* <div>
                      <table className="border-separate border-spacing-x-2">
              
              <tbody>
              <th>Details</th>
                      <tr><td>Feels</td><td>22C</td></tr>
                      <tr><td>Wind</td><td>2.6ms</td></tr>
                      <tr><td>Humidity </td><td>78%</td></tr>
                <tr><td>Pressure</td><td>1015 hPa</td></tr>
                </tbody>
                
                  </table>
                  </div> */}
              </div>
        </div>
    </div>
  );
}
