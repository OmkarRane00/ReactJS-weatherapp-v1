import React from 'react'
import './waiting.css';
function waiting() {
  return (
    <div className='waiting-main'>
        <div className='wait-icon'></div>
        <div className='wait-heading'>Waiting for location.</div>
        <div className='wait-details'>Kindly allow location access for the application to work. Location provided by user will only be used to acess details such as 
        temprature, windspeed, etc. We won't use any userdata regarding location or any other user data.
        </div>
    </div>
  )
}

export default waiting