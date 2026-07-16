import { useExam } from './hooks/useExam.js'
import { ExamPlanScreen } from './components/pages/ExamPlanScreen.jsx'
import { ExamScreen } from './components/pages/ExamScreen.jsx'
import { CheckinScreen } from './components/pages/CheckinScreen.jsx'

function App() {
  const exam = useExam()

  if (exam.pantalla === 'plan') {
    return <ExamPlanScreen exam={exam} />
  }

  if (exam.pantalla === 'exam') {
    return <ExamScreen exam={exam} />
  }

  return <CheckinScreen exam={exam} />
}

export default App
