import React, { useEffect, useState } from 'react';
import Navigation from './Navigation';
import { Link, Route, Routes, useNavigate, Navigate } from 'react-router-dom';

import ArticleList from './ArticleList';
import { useAuth } from './AuthContext';
import { useStyles } from './StylesContext';
import { RgbaColorPicker } from "react-colorful";


const ProtectedRoute = ({ children }) => {
  const {user} = useAuth();
  return user!==null ? children : <Navigate to="/login" />;
};

const Articles = () => {
  const {user, authedPost, authedGet} = useAuth();
  const [temps, setTemps] = useState(undefined);
  const [solar, setSolar] = useState(undefined);

  const [color0, setColor0] = useState(undefined);
  const [color1, setColor1] = useState(undefined);
  const [color2, setColor2] = useState(undefined);
  const [color3, setColor3] = useState(undefined);


  const convertLeds = (num) => {
    let numArr = []

    let goodArr = []

    for(let i=0; i<16; i++){
      numArr.push(parseInt(num.substr(0, 3)))
      num = num.substr(3);
    }
    for(let i=0; i<4; i++){
      goodArr.push({r:numArr[i*4], g:numArr[i*4+1], b:numArr[i*4+2], a:numArr[i*4+3]/255.0})
    }

    return goodArr;
  }

  const getSensors = async () => {
    try {
      const response = await authedGet('/api/content/sensors');
      if(response === null)
        throw 'error'

      //console.log(await response.json());

      const res = await response.json()
      setTemps(res.temps);
      setSolar(res.solar);
    } catch (error) {
      setTemps(null);
    }
  };
  const getLeds = async () => {
    try {
      const response = await authedGet('/api/content/leds');
      if(response === null)
        throw 'error'

      //console.log(await response.json());

      const res = await response.text();
      const data = convertLeds(res)
      setColor0(data[0])
      setColor1(data[1])
      setColor2(data[2])
      setColor3(data[3])


      //setTemps(res.temps);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange0 = (color: RgbaColor) => {

    setColor0(color);
  };

const handleChange1 = (color: RgbaColor) => {
  setColor1(color);
};

const handleChange2 = (color: RgbaColor) => {
  setColor2(color);
};

const handleChange3 = (color: RgbaColor) => {
  console.log(color);
  setColor3(color);
};


  const setLeds = async () => {

    console.log(color0)
    console.log(color1)
    console.log(color2)
    console.log(color3)
    try {



      return


      const response = await authedPost('/api/content/leds');
      if(response === null)
        throw 'error'

      //console.log(await response.json());

      const res = await response.text();


      //setTemps(res.temps);
    } catch (error) {
      console.log(error)
    }
  };


  useEffect(() => {

    getSensors();
    getLeds();

  }, []);


  useEffect(() => {
    const interval = setInterval(async () => {

      await setLeds();
      await getSensors();
      await getLeds();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const styles = useStyles();


  return (
    <>
    <Navigation />


    <div style={{display: 'flex',flexDirection:"column", alignItems:"center"}}>
      <div className={styles.contentCard} style={{justifyContent: 'space-between',display: 'flex', flexDirection:'column',  alignItems:'center',width: '60%'}}>
        {
          solar===undefined?
            <h2>Loading</h2>
            :
          solar===null?
            <h2>Could not load...</h2>
            :
            <h2>Panele fotowoltaiczne: {solar.value} V</h2>
        }

      </div>
      <div style={{display: 'flex', flexDirection: 'row',width: '100%', justifyContent:'center' }}>
        <div className={styles.contentCard}style={{justifyContent: 'space-between',display: 'flex', flexDirection:'column',  alignItems:'center',width: '30%', height: '40vh'}}>
          {
            temps===undefined?
              <h2>Loading</h2>
              :
            temps===null?
              <h2>Could not load...</h2>
              :
              <h2>{temps[0].name}</h2>
          }
          <RgbaColorPicker color={color0} onChange={handleChange0} style={{width: "40%", height: "50%" }}/>
          {
            temps===undefined||temps===null?
              <h2>...</h2>
              :
              <h2>{temps[0].temperature}°C</h2>
          }
        </div>

        <div className={styles.contentCard}style={{justifyContent: 'space-between',display: 'flex', flexDirection:'column',  alignItems:'center',width: '30%', height: '40vh', marginLeft:"10px"}}>
          {
            temps===undefined?
              <h2>Loading</h2>
              :
            temps===null?
              <h2>Could not load...</h2>
              :
              <h2>{temps[1].name}</h2>
          }
          <RgbaColorPicker color={color1} onChange={handleChange1} style={{width: "40%", height: "50%" }}/>
          {
            temps===undefined||temps===null?
              <h2>...</h2>
              :
              <h2>{temps[1].temperature}°C</h2>
          }
        </div>


      </div>
      <div style={{display: 'flex', flexDirection: 'row',width: '100%', justifyContent:'center' }}>
        <div className={styles.contentCard}style={{justifyContent: 'space-between',display: 'flex', flexDirection:'column',  alignItems:'center',width: '30%', height: '40vh'}}>
          {
            temps===undefined?
              <h2>Loading</h2>
              :
            temps===null?
              <h2>Could not load...</h2>
              :
              <h2>{temps[2].name}</h2>
          }
          <RgbaColorPicker color={color2} onChange={handleChange2} style={{width: "40%", height: "50%" }}/>
          {
            temps===undefined||temps===null?
              <h2>...</h2>
              :
              <h2>{temps[2].temperature}°C</h2>
          }
        </div>

        <div className={styles.contentCard} style={{justifyContent: 'space-between',display: 'flex', flexDirection:'column',  alignItems:'center',width: '30%', height: '40vh', marginLeft:"10px"}}>
          {
            temps===undefined?
              <h2>Loading</h2>
              :
            temps===null?
              <h2>Could not load...</h2>
              :
              <h2>{temps[3].name}</h2>
          }

          <RgbaColorPicker color={color3} onChange={handleChange3}/>
          {
            temps===undefined||temps===null?
              <h2>...</h2>
              :
              <h2>{temps[3].temperature}°C</h2>
          }

        </div>



      </div>


    </div>
  </>
  );
}

export default Articles
