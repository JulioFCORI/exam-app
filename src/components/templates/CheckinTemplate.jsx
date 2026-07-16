export function CheckinTemplate({ resumen, acciones, filtros, revision }) {
  return (
    <div className="mx-auto max-w-2xl space-y-4 p-4 sm:p-6">
      <h1 className="text-2xl font-bold text-slate-900">Resultados del examen</h1>
      {resumen}
      {acciones}
      {filtros}
      {revision}
    </div>
  )
}
