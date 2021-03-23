import React, { useState, useEffect } from "react";

 
function Counter(){
  const [timer, setTimer] = useState({
    min: 0,
    sec: 10,
  });

  
  const click = () => {
    setInterval(() => {
      setTimer((state, props) => {
        return {
          min: state.sec == 0 ? state.min - 1 : state.min,
          sec: state.sec == 0 ? 59 : state.sec - 1,
        };
      });
    }, 1000);
  };
 
  return (
    <>
      <div className="App">
        {timer.min < 10 ? "0" + timer.min : timer.min}:
        {timer.sec < 10 ? "0" + timer.sec : timer.sec}
        <br />
        <button onClick={click}>start</button>
     
      </div>
    </>
  );
};

export default Counter