import React, { useState } from 'react'


const useDatentime = () => {
let time = new Date().toLocaleTimeString();

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
                5 May, Wednesday
              </div>
    </>
  );
}

export default useDatentime