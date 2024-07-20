import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Questions from "./components/Questions";
import Progress from "./components/Progress";
import FinshScreen from "./components/FinshScreen";
import NextButton from "./components/NextButton";
import Timer from "./components/Timer";
import Footer from "./components/Footer";
import "./App.css";

import { useQuiz } from "./context/QuizContext";

const App = () => {
  const { status } = useQuiz();

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Progress />
            <Questions />
            <Footer>
              <NextButton />
              <Timer />
            </Footer>
          </>
        )}
        {status === "finished" && <FinshScreen />}
      </Main>
    </div>
  );
};

export default App;
