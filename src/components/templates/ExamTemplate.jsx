export function ExamTemplate({ header, preguntas, acciones, modal }) {
  return (
    <div className="mx-auto max-w-2xl space-y-4 p-4 sm:p-6">
      {header}
      {preguntas}
      {acciones}
      {modal}
    </div>
  )
}
