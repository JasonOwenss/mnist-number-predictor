import React, {useRef, useState, useEffect} from 'react'

const Canvas = props => {  
  const canvasRef = useRef(null);
  const [context, setContext] = useState(null); 

  
  useEffect(() => {

    var mouseDown = false;
    var start = {x:0,y:0};
    var end = {x:0,y:0};
    var canvasOffsetLeft = 0;
    var canvasOffsetTop = 0;
    
    
    function handleMouseDown(e){
      mouseDown = true;

      start = {
        x: e.clientX - canvasOffsetLeft,
        y: e.clientY - canvasOffsetTop,
      };

      end = {
        x: e.clientX - canvasOffsetLeft,
        y: e.clientY - canvasOffsetTop,
      };
    }

    function handleMouseMove(e){
      if (mouseDown && context){
        start = {
          x: end.x,
          y: end.y,
        };

        end = {
          x: e.clientX - canvasOffsetLeft,
          y: e.clientY - canvasOffsetTop,
        };

        context.beginPath();
        context.moveTo(start.x, start.y);
        context.lineTo(end.x, end.y);
        context.strokeStyle = "white";
        context.lineWidth = 20;
        context.stroke();
        context.closePath();
      }
    }

    function handleMouseUp(e){
      mouseDown = false;
    }

    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      
      if (ctx){
        canvasRef.current.addEventListener('mousedown', handleMouseDown);
        canvasRef.current.addEventListener('mouseup', handleMouseUp);
        canvasRef.current.addEventListener('mousemove', handleMouseMove);

        canvasOffsetLeft = canvasRef.current.offsetLeft;
        canvasOffsetTop = canvasRef.current.offsetTop;
        
        setContext(ctx);
      }
      
    }
    
    return function cleanup() {
      if (canvasRef.current) {
        canvasRef.current.removeEventListener('mousedown', handleMouseDown);
        canvasRef.current.removeEventListener('mouseup', handleMouseUp);
        canvasRef.current.removeEventListener('mousemove', handleMouseMove);
      }
    }
  }, [context]);

  function handleClear(e){
    const context = canvasRef.current.getContext('2d');
    context.clearRect(0,0,canvasRef.current.width, canvasRef.current.height);
  }

  function handleSave(e){
    const dataUrl = canvasRef.current.toDataURL();
    props.handleSetB64(dataUrl);
  }

  return (
          <div>
            <canvas 
              className="canvas" 
              ref={canvasRef}
              width={500}
              height={500}
              style={{
                border: '2px solid #000',
                marginTop: 10,
                backgroundColor: "black",
              }}/>
            <button onClick={handleClear}>clear</button>
            <button onClick={handleSave}>save</button>
          </div>
          )
}

export default Canvas