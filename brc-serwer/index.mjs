import express from "express";

const app = express();
const port = 3000;

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
    console.log(res.body.length)
    res.setHeader('content-type','text/html');
    res.send(res.body);
});

app.post('/sensors', (req,res) => {
    console.log(req.body);
    res.send(req.body)
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})