import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3001;
let sensors = 0;

app.use(bodyParser.text({type: '*/*'}));

//do srarduino
app.get('/', (req,res) => {
    res.send("działa");
})

//var r = 255, g = 0, b = 0, br=255;
var leds = [{r:255, g:0, b:0, br: 255},
            {r:0, g:255, b:0, br: 255},
            {r:0, g:0, b:255, br: 255},
            {r:0, g:255, b:0, br: 255}];
app.get('/leds', (req,res) => {  
    
    res.body = "";
    for(let i = 0; i<leds.length; i++){
        if(leds[i].r==255){
            leds[i].r=0;
            leds[i].g=255;
        }
        else if(leds[i].g==255){
            leds[i].g=0;
            leds[i].b=255;
        }
        else if(leds[i].b==255){
            leds[i].b=0;
            leds[i].r=255;
        }
    
        res.body += String(leds[i].r).padStart(3, '0')+String(leds[i].g).padStart(3, '0')+String(leds[i].b).padStart(3, '0')+String(leds[i].br).padStart(3, '0');
        
    }
    console.log(res.body)
    res.setHeader('content-type','text/html');
    res.send(res.body);
});

app.post('/sensors', (req,res) => {
    sensors = req.body;
})


//do frontu
app.get('/sensors', (req, res) => {
    //res.setHeader('content-type', 'text/plain');
    res.body = sensors;
    res.send(sensors);
    console.log(res.body);
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})