import { useQuiz } from '../context/QuizContext'

const StartScreen = () => {
  const {dispatch, numQuestions} = useQuiz()
  return (
    <div className='start'>
        <h2>Welcome to the React Quiz!</h2>
        <h3>{numQuestions} questions to test the React mastery</h3>
        <button className='btn btn-ui' onClick={() => dispatch({type: 'active'})}>Let&apos;s Start</button>
    </div>
  )
}

export default StartScreen