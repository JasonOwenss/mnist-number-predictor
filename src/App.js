import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import downscale from 'downscale';
import * as tf from '@tensorflow/tfjs';
import Canvas from './components/Canvas';

function App() {
  const [b64, setB64] = useState('');
  const [prediction, setPrediction] = useState(0);
  

  function ds(im){
    
    downscale(im,28,28,{imageType:'png'}).then(async function(dataURL){
      setB64(dataURL);
      const tfim = new Image();
      tfim.src = dataURL;
      const model = await tf.loadLayersModel('../CNNmodel/model.json');
      const example = await tf.browser.fromPixels(tfim).mean(2).toFloat().expandDims(0).expandDims(-1).div(255.0);
      const prediction = await model.predict(example);
      //prediction.print()
      setPrediction(prediction.argMax(1).dataSync()[0]);
    })
    return 
  } 
  
  function handleSetB64(img){
    const im = new Image();
    im.src = img;
    ds(img);

    
  }

  return (
    <div className="App">
      
      <Canvas handleSetB64={handleSetB64}/>
      <div>{prediction}</div>
    </div>
  );
}

export default App;
