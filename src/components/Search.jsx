import React, { useEffect, useState } from 'react';

import axios from 'axios';

const Search = () => {
    const [city, setCity] = useState("");
    const [details, setDetails] = useState({});
    const API_KEY = "aaf2af91c84551d340a5e09b6ddbd54e";

    useEffect(() => {
        if (city.trim() !== "") {
            getData();
        }
    }, [city]);

    function resetCity() {
        setCity("");
    }

    function getData(city) {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
            .then((res) => {
                const output = res.data;
                console.log(output)
                const obj = {
                    temp: (parseInt(output.main.temp) - 273.15) * 1.8 + 32,
                    desc: output.weather[0].description,
                    name: output.name,
                    img:output.weather[0]
                }
                setDetails(obj);
                resetCity();
            })
            .catch((error) => console.log(error));
    }

    function handleInput(e) {
        setCity(e.target.value);
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            getData(city);
        }
    }

    return (
        <div>
            <input type='text' value={city} onChange={handleInput} onKeyDown={handleKeyDown}  placeholder='Enter the city '/>
           
            {details.name && (
                <div>
                    <h2>{details.name}</h2>
                    <h1>{details.temp}°F </h1>
                    <div>{details.desc}</div>
                    <div className="icon">
            <img
              src={`http://openweathermap.org/img/w/${details.img}.png`}
             
            />
          </div>
                </div>
            )}
            
        </div>
    );
}

export default Search;
