import React from "react";

const NextButton = ({ index, numQuestions, answer, dispatch }) => {
  const hasAnswer = answer !== null;
  return (
    <>
      {hasAnswer ? (
        index + 1 < numQuestions ? (
          <button
            className="btn btn-ui"
            onClick={() => dispatch({ type: "nextQuestion" })}
          >
            Next
          </button>
        ) : (
          <button
            className="btn btn-ui"
            onClick={() => dispatch({ type: "finished" })}
          >
            Finish
          </button>
        )
      ) : (
        ""
      )}
    </>
  );
};

export default NextButton;
