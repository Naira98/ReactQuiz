import { createContext, useContext, useReducer } from "react";
import useAPI from "../hooks/useAPI";

const QuizContext = createContext();

const SECS_PER_QUESTION = 15;

const intialState = {
  questions: [],

  // Status: 'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  remaingSeconds: null,
};
const render = (state, action) => {
  switch (action.type) {
    case "dataRecieved":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "active":
      return {
        ...state,
        status: "active",
        remaingSeconds: state.questions.length * SECS_PER_QUESTION,
      };
    case "getAnswer": {
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    }
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finished":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return {
        ...intialState,
        status: "ready",
        questions: state.questions,
        highscore: state.highscore,
      };
    case "tick":
      return {
        ...state,
        remaingSeconds: state.remaingSeconds - 1,
        status: state.remaingSeconds === 0 ? "finished" : state.status,
      };
  }
};

const QuizProvider = ({ children }) => {
  const [
    { questions, status, index, answer, points, highscore, remaingSeconds },
    dispatch,
  ] = useReducer(render, intialState);

  const numQuestions = questions.length;
  const maxPoints = questions.reduce((prev, curr) => prev + curr.points, 0);
  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        remaingSeconds,
        numQuestions,
        maxPoints,
        dispatch,
      }}
    >
      <QuizLoader />
      {children}
    </QuizContext.Provider>
  );
};

const QuizLoader = () => {
  useAPI("questions", "dataRecieved", "DataFailed");

  return null;
};

const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("QuizContext was used outside QuizProvider");
  return context;
};

export { QuizProvider, useQuiz };
