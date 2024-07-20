import { useQuiz } from "../context/QuizContext";

const Questions = () => {
  const { questions, index, dispatch, answer } = useQuiz();
  const question = questions[index];

  const hasAnswer = answer !== null;
  return (
    <div>
      <h4>{question.question}</h4>
      <div className="options">
        {question.options.map((option, index) => (
          <button
            key={option}
            className={`btn btn-option ${answer === index ? "answer" : ""} ${
              hasAnswer
                ? index === question.correctOption
                  ? "correct"
                  : "wrong"
                : ""
            }`}
            disabled={hasAnswer}
            onClick={() => dispatch({ type: "getAnswer", payload: index })}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Questions;
