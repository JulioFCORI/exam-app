export function PlanTemplate({ carga, recuperacion, configuracion, modal }) {
  return (
    <div className="mx-auto max-w-2xl space-y-4 p-4 sm:p-6">
      <h1 className="text-2xl font-bold text-slate-900">Exam-APP</h1>
      {carga}
      {recuperacion}
      {configuracion}
      {modal}
    </div>
  )
}
