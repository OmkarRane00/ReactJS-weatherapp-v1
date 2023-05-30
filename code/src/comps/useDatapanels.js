import React,{ useState,useEffect } from 'react';
import Wait from './waiting'
import GeoLoc from './useGeoLoc';
import Dnt from './Dnt';
import './useDatapanels.css';
const api = {
    apikey:"adc61bd6a97bbf49d8423f25491fd6fa",
    baseurl:"https://api.openweathermap.org/data/2.5/weather?",
  };
    
const useDatapanels = () => {

    const [winfo,setwinfo]=useState({});
    const[cel,updatecel]=useState(0);
    const location = GeoLoc();
    const[feelslike,setfeels] = useState(0);
    var lat,lng,k,k1,bgim;
    if(location.location.perm){
      lat = JSON.stringify({location}.location.location.coordinates.lat);
      lng = JSON.stringify({location}.location.location.coordinates.lng);
    }
    
    const newcity = ()=>{
      var cty = document.getElementById("city").value;
      fetch(`${api.baseurl}q=${cty}&appid=${api.apikey}`)
        .then(res=>res.json())
        .then((result)=>{
          if(result.main){
          k1 = result.main.feels_like;
          setfeels(Math.round(k1 - 273.15));
          k = result.main.temp;
          // console.log(result)
          updatecel(Math.round(k - 273.15));
        setwinfo(result)
        }
      });
    }

    const loadinfo = ()=>{
        fetch(`${api.baseurl}lat=${lat}&lon=${lng}&appid=${api.apikey}`)
        .then(res=>res.json())
        .then((result)=>{
          if(result.main){
            k = result.main.temp;
            k1 = result.main.feels_like;
            setfeels(Math.round(k1 - 273.15));
            // console.log(result)
            updatecel(Math.round(k - 273.15));
            setwinfo(result)
          }
          
        });
    }

    useEffect(() => {
    
    if(location.location.loaded){
      loadinfo();
    }

  }, [location.location.loaded]);
  
  return (

    <div className="data-panel">
      {winfo.sys ? (
        <>
        <div className='img-name'>
          
          </div>
          <div className='panel p-left'>
          <div className='location-big'>
            <div className='loc-city'>{winfo.name}</div>
            <div className='loc-country'>{winfo.sys.country}</div>
          </div>
          <div className='left-bottom'>
            <div className='datetime'>
              <Dnt/>
            </div>
          <div className="temp">
            <span>{cel}</span>&deg;C
          </div>
          </div>
        </div>
        <div className='panel p-right'>
          <div className='searchcity'>
            <input type='text' id='city' placeholder='Search city..' onBlur={newcity}></input>
            <i className="fa-solid fa-magnifying-glass" onClick={newcity}></i>
          </div>
          <div className='w-icon'>
          {
        	  {
              'Clear': <i className="fa-regular fa-sun"></i>,
              'Clouds': <i className="fa-solid fa-cloud"></i>,
              'Rain': <i className="fa-solid fa-cloud-showers-heavy"></i>,
              'Haze':<i className="fa-solid fa-smog"></i>,
              'Snow':<i className="fa-regular fa-snowflake"></i>,
              'Dust':<i className="fa-solid fa-wind"></i>,
              'Smoke':<i class="fa-solid fa-wind"></i>
        	  }[winfo.weather[0].main]
      	  } 
            
            <span>{winfo.weather[0].main}</span>
          </div>
          <div className='detail-info'>
            <div className='indi-info'>
              <span>Feels Like</span>
              
              <span>{feelslike}&deg;</span>
            </div>
            <div className='indi-info'>
              <span>Humidity</span>
              <span>{winfo.main.humidity}%</span>
            </div>
            <div className='indi-info'>
              <span>Pressure</span>
              <span>{winfo.main.pressure} hPa</span>
            </div>
            <div className='indi-info'>
              <span>Wind Speed</span>
              <span>{winfo.wind.speed} m/s</span>
            </div>
          </div>
        </div>
        </>
      ) : (<Wait/>)}
        
      </div>
  );
}

export default useDatapanels