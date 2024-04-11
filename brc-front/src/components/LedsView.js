import React from 'react';
import Header from './Header';

const convertLeds = (num) => {
  
  let str_arr = num.toString().match(/\d{1,12}/g);
  let num_arr = [];
  for (let i = 0; i < str_arr.length; i++) {
    num_arr[i] = str_arr[i].match(/\d{1,3}/g);
    for (let j = 0; j < num_arr[i].length; j++) {
      num_arr[i][j] = parseInt(num_arr[i][j]);
    }
  }
 
  return num_arr;
}



function LedsView() {
  const [currentLeds, setCurrentLeds] = React.useState(0);
  let prettyLeds = [];

  React.useEffect(() => {
    const handleFetchLeds = async () => {

      const res = await fetch('leds', {method: "GET"});

      if(!res.ok) {
        setCurrentLeds(0);
        console.log("Error while getting leds");
      }

      const data = await res.text();
      
      setCurrentLeds(data);

    };
    const timer = setInterval(() => {
      handleFetchLeds();
    }, 5000);

    return () => clearInterval(timer);
    
  }, [])

  if(currentLeds.length !== 0) {
    prettyLeds = convertLeds(currentLeds);
    console.log(prettyLeds);
  }

  return (
    <div>
      <Header />
      <div className='home'>
        <div className='p p1'>

        </div>
        <div className='p p2'>

        </div>
        <div className='p p3'>

        </div>
        <div className='p p4'>
          
        </div>
      </div>
      
    </div>
  )
}

export default LedsView;