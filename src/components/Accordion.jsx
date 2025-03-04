import { useState } from "react";

export default function Accordion() {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleOpen = () => {
    setIsOpen(!isOpen)
  }
  return (
    <div className="w-11/12 mx-auto mt-5  ">
      <span className="text-2xl font-bold">Daily</span>
      <div className="flex justify-between border p-2 rounded-lg bg-amber-100 hover:cursor-pointer" onClick={handleOpen}>
        <div className="flex w-[100px] justify-between">
          <div>Image</div>
          <div>Day</div>
        </div>
        <div className="flex w-[150px] justify-between">
          <div>Clear Sky</div>
          <div>32C/32C</div>
        </div>
      </div>
      {isOpen && <div className="flex flex-col">
      {/* <div className="flex justify-between p-2">
        <div className="text-gray-400">Pressure</div>
        <div className="w-[150px] flex justify-between">
          <div>1012 hPa</div>
          <div className="text-gray-400">Humidity</div>
        </div>
        <div>21%</div>
      </div>

      <div className="w-full p-2">
          <table className="w-full">
            <tbody>
          <tr className="flex justify-between w-full">
            <td className="text-gray-400">Clouds</td>
            <td className="flex space-x-4">  
              <span>4%</span>
              <span className="text-gray-400">Wind Speed</span>
            </td>
            <td>2.63m/s</td>
              </tr>
              </tbody>
        </table>
        </div> */}
        </div>}
      
    </div>
  );
}
