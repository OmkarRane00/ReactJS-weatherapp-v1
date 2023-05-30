import React, { useState } from 'react'

function Dnt() {
    let time = new Date().toLocaleTimeString();
    let d = new Date().toDateString();
    const myArray = d.split(" ");
    const [ctime,setctime] = useState(time);
    setInterval(() => {
        time = new Date().toLocaleTimeString();
        setctime(time);
    }, 1000);

  return (
    <>
              <div className='time'>
                {ctime} 
              </div>
              <div className='date'>
                 {
        	  {
              'Mon': "Monday",
              'Tue': "Tuesday",
              'Wed': "Wednesday",
              'Thu':"Thursday",
              'Fri':"Friday",
              'Sat':"Saturday",
              'Sun':"Sunday"
        	  }[myArray[0]]
      	  }, {myArray[1]} {myArray[2]}
                
              </div>
    </>
  )
}

export default Dnt