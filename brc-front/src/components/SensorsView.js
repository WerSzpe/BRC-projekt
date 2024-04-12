import React from 'react';
import Header from './Header';

const convertSensors = (num) => {
    let newNums_str = num.toString().match(/\d{1,4}/g);
    console.log(newNums_str);
    let newNums_num = [];
    let newNum = 0;
    for (let i = 0; i < newNums_str.length; i++) {
      newNum = parseInt(newNums_str[i]);
      newNums_num.push(newNum/10);
    }
    newNums_num[4] = newNums_num[4]/10;
    
    return newNums_num;
}

function SensorsView() {
    const [sensors, setSensors] = React.useState(0);
    let sensorsOk = React.useRef(false);
    let prettyNums = [];


    React.useEffect(() => {
        const handleFetchSensors = async () => {
            const res = await fetch('api/content/sensors', {method: 'GET'});

            if(!res.ok) {
                setSensors(0);
                console.log("Error while fetching data");
            }

            const data = await res.text();
            console.log(data);
            setSensors(data);
        
        }
        handleFetchSensors();
        sensorsOk.current = true;
    }, []);



    if(sensorsOk) {
        prettyNums = convertSensors(sensors);
        console.log(prettyNums);
    }
    return (
        <div>
            <Header />
            {sensorsOk ? (
                prettyNums.map((elem) => {
                    return <li key={elem+"1"}>{elem}</li>
                })
            ) : (
                <p>Could not get sensors!</p>
            )
            }
        </div>
    )
}

export default SensorsView;