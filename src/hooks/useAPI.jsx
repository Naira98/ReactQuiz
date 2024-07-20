import { useEffect } from 'react'
import { useQuiz } from '../context/QuizContext';

const useAPI = (path, successType, FailedType) => {
    const {dispatch} = useQuiz()
    useEffect(() => {
        fetch(`http://localhost:8000/${path}`)
          .then((res) => res.json())
          .then((data) => dispatch({ type: `${successType}`, payload: data }))
          .catch(() => dispatch({ type: `${FailedType}` }));
      }, [FailedType, successType, dispatch, path ]);
  return null
}

export default useAPI