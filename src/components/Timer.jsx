import { useEffect } from "react";
import { useQuiz } from "../context/QuizContext";

const Timer = () => {
  const { remaingSeconds, dispatch } = useQuiz()
  const mins = Math.floor(remaingSeconds / 60);
  const secs = remaingSeconds % 60;
  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, [dispatch]);
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
