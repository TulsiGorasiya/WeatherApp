//"b2056257d39b02814601c03101c39361"
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"
import {  useState } from "react";
import { ToastContainer,toast } from 'react-toastify';
import './App.css';

function App() {


  const apiKey = "b2056257d39b02814601c03101c39361"
  const [inputCity, setInputCity] = useState("")
  const [data, setData] = useState({})


  const getWetherDetails = (cityName) => {
    if (!cityName) return
    const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey
    axios.get(apiURL).then((res) => {
      console.log("response", res.data)
      setData(res.data)
    }).catch((err) => toast.error("Incorrect cityName"));
  }

  const handleChangeInput = (e) => {
    console.log("value", e.target.value)
    setInputCity(e.target.value)
  }

  const handleSearch = () => {
    getWetherDetails(inputCity)
  }


  return (
    <div className="col-md-12">
      <div className="weatherBg">
        <h1 className="heading">Weather App</h1>

        <div className="d-grid gap-3 col-4 mt-4">
          <input type="text" className="form-control"
            value={inputCity}
            onChange={handleChangeInput} placeholder="enter city name here...." />
          <button className="btn btn-primary" type="button"
            onClick={handleSearch}
          >Search</button>
          <ToastContainer autoClose={3000}  />
        </div>
      </div>

      {Object.keys(data).length > 0 &&
        <div className="col-md-12 text-center mt-5">

          <div className=" weatherResultBox">
            <img className="weatherIcon"
              src="https://i.pinimg.com/originals/77/0b/80/770b805d5c99c7931366c2e84e88f251.png" alt="not available" />

            <h5 className="weatherCity">
              {data.name}
            </h5>
            <h6 className="weatherTemp">{((data.main.temp) - 273.15).toFixed(2)}°C</h6>
          </div>
        </div>
      }

    </div>
  );
}

export default App;