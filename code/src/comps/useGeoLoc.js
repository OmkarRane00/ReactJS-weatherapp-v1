import { useEffect, useState } from 'react'

const useGeoLoc = () => {
    const[location ,setLocation]=useState({
        loaded:false,
        coordinates:{ lat:"0",lng:"0" }, 
    }); 


    const onSuccess = (location)=>{
        setLocation({
            loaded:true,
            perm:true,
            coordinates:{
                lat: location.coords.latitude,
                lng:location.coords.longitude,
            }
        });
        
    };

    const onError = error => {
        setLocation({
            loaded:true,
            perm:false,
            error,
        });
    }


    useEffect(()=>{
        if(!("geolocation" in navigator)){
             onError({
                code:0,
                message:"Unable to get location",
            });
            
        }


        navigator.geolocation.getCurrentPosition(onSuccess,onError);


    },[])
  return {location}
}

export default useGeoLoc
