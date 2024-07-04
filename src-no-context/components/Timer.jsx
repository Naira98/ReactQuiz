import React, { useEffect } from "react";

const Timer = ({ remaingSeconds, dispatch }) => {
  const mins = Math.floor(remaingSeconds / 60);
  const secs = remaingSeconds % 60;
  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, []);
  return (
    <div className="timer">
      {mins <= 9 && "0"}
      {mins} : 
      {secs <= 9 && "0"}
      {secs}
    </div>
  );
};

export default Timer;
