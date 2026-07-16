import { CategoriaResumenCard } from '../molecules/CategoriaResumenCard.jsx'

export function ResumenResultados({ calificacionGlobal, mejor, peor }) {
  return (
    <section className="rounded-lg border border-slate-200 p-4">
      <h2 className="text-base font-semibold text-slate-900">Resultados</h2>
      <p className="mt-1 text-3xl font-bold text-slate-900">{calificacionGlobal} / 10</p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {mejor && (
          <CategoriaResumenCard
            titulo="Mejor desempeño"
            categoria={mejor.categoria}
            calificacion={mejor.calificacion}
            correctas={mejor.correctas}
            total={mejor.total}
            acreditada={mejor.acreditada}
          />
        )}
        {peor && (
          <CategoriaResumenCard
            titulo="Peor desempeño"
            categoria={peor.categoria}
            calificacion={peor.calificacion}
            correctas={peor.correctas}
            total={peor.total}
            acreditada={peor.acreditada}
          />
        )}
      </div>
    </section>
  )
}
