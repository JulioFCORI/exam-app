import { useEffect, useState } from 'react'
import { ExamTemplate } from '../templates/ExamTemplate.jsx'
import { ExamHeader } from '../organisms/ExamHeader.jsx'
import { QuestionList } from '../organisms/QuestionList.jsx'
import { Button } from '../atoms/Button.jsx'
import { ConfirmModal } from '../molecules/ConfirmModal.jsx'

export function ExamScreen({ exam }) {
  const [pasoFinalizar, setPasoFinalizar] = useState(0) // 0=cerrado, 1=primera confirmación, 2=segunda
  const { examenActual } = exam

  // El examen con tiempo límite se finaliza automáticamente al agotarse (sin doble confirmación).
  useEffect(() => {
    if (examenActual.tiempoLimite != null && examenActual.tiempoRestante === 0) {
      exam.finalizarExamen()
    }
  }, [examenActual.tiempoLimite, examenActual.tiempoRestante, exam])

  return (
    <ExamTemplate
      header={
        <ExamHeader
          examenActual={examenActual}
          advertenciaTiempo={exam.advertenciaTiempo}
          onToggleCronometro={exam.toggleCronometro}
        />
      }
      preguntas={
        <QuestionList
          preguntas={examenActual.preguntas}
          respuestas={examenActual.respuestas}
          onResponder={exam.responderPregunta}
        />
      }
      acciones={
        <div className="flex justify-end">
          <Button onClick={() => setPasoFinalizar(1)}>Finalizar examen</Button>
        </div>
      }
      modal={
        <>
          <ConfirmModal
            abierto={pasoFinalizar === 1}
            titulo="¿Finalizar examen?"
            mensaje="¿Seguro que quieres finalizar? Aún puedes seguir respondiendo."
            onConfirmar={() => setPasoFinalizar(2)}
            onCancelar={() => setPasoFinalizar(0)}
            textoConfirmar="Sí, finalizar"
          />
          <ConfirmModal
            abierto={pasoFinalizar === 2}
            titulo="Confirma de nuevo"
            mensaje="Esta acción no se puede deshacer. ¿Finalizar el examen ahora?"
            onConfirmar={() => {
              setPasoFinalizar(0)
              exam.finalizarExamen()
            }}
            onCancelar={() => setPasoFinalizar(0)}
            textoConfirmar="Finalizar definitivamente"
          />
        </>
      }
    />
  )
}
