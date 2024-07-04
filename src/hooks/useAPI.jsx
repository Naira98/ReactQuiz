import React, { useEffect } from 'react'
import { useQuiz } from '../context/QuizContext';

const useAPI = (path, successType, FailedType) => {
    const {dispatch} = useQuiz()
    useEffect(() => {
        fetch(`http://localhost:8000/${path}`)
          .then((res) => res.json())
          .then((data) => dispatch({ type: `${successType}`, payload: data }))
          .catch((err) => dispatch({ type: `${FailedType}` }));
      }, []);
  return null
}

export default useAPI