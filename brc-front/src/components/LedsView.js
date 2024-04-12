import React from 'react';
import Header from './Header';
import ColorPicker from './ColorPicker';
import "./LedsView.css";

//zwraca do rgba ładne 255, 255, 255, 255
const convertLeds = (num) => {
  
  let str_arr = num.toString().match(/\d{1,12}/g);
  let num_arr = [];
  let last_str_arr = [];
  let joined_str = "";

  for (let i = 0; i < str_arr.length; i++) {
    num_arr[i] = str_arr[i].match(/\d{1,3}/g);
    for (let j = 0; j < num_arr[i].length; j++) {
      joined_str = num_arr[i].join(", ");
      
    }
    last_str_arr.push(joined_str);
  }
 
  return last_str_arr;
}

function LedsView() {
  const [currentLeds, setCurrentLeds] = React.useState(0);
  const [color1, setColor1] = React.useState("rgba(255,255,255,255)");
  const [color2, setColor2] = React.useState("rgba(255,0,255,255)");
  const [color3, setColor3] = React.useState("rgba(255,255,0,255)");
  const [color4, setColor4] = React.useState("rgba(0,255,255,255)");
  let prettyLeds = [];

  React.useEffect(() => {
    const handleFetchLeds = async () => {

      const res = await fetch('api/content/leds', {method: "GET"});

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
    
  }, []);

  //sending to esp
  const handleClick = async () => {

  }

  if(currentLeds.length !== 0) {
    prettyLeds = convertLeds(currentLeds);
  }

  return (
    <div className='container-fluid'>
      <Header />
      <div className='container'>
        <div className='dom'>

        <div className='pokoje'>

          <div className='p1'>
            <p>Room 1</p> 
            <p>{color1}</p>
            <ColorPicker color={color1} onChange={setColor1}/>
            <button className="btn btn-secondary" onClick={handleClick}>Send to home</button>

          </div>
          <div className='p2'>
            <p>Room 2</p>
            <p>{color2}</p>
            <ColorPicker color={color2} onChange={setColor2}/>

          </div>
          <div className='p3'>
            <p>Room 3</p>
            <p>{color3}</p>
            <ColorPicker color={color3} onChange={setColor3}/>

          </div>
          <div className='p4'>
            <p>Room 4</p>
            <p>{color4}</p>
            <ColorPicker color={color4} onChange={setColor4}/>
            
          </div>

          </div>

        </div>
      </div>
    </div>
  )
}

export default LedsView;