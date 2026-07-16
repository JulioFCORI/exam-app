import { Cronometro } from '../molecules/Cronometro.jsx'
import { Badge } from '../atoms/Badge.jsx'

export function ExamHeader({ examenActual, advertenciaTiempo, onToggleCronometro }) {
  return (
    <header className="rounded-lg border border-slate-200 p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-xl font-bold text-slate-900">Examen en curso</h1>
        {examenActual.esRecuperacion && (
          <Badge tono="alerta">Recuperación: {examenActual.categoriasSeleccionadas[0]}</Badge>
        )}
      </div>

      <div className="mt-3">
        <Cronometro
          tiempoLimite={examenActual.tiempoLimite}
          tiempoRestante={examenActual.tiempoRestante}
          tiempoTranscurrido={examenActual.tiempoTranscurrido}
          mostrarCronometro={examenActual.mostrarCronometro}
          advertencia={advertenciaTiempo}
          onToggle={onToggleCronometro}
        />
      </div>

      {advertenciaTiempo && (
        <p className="mt-2 rounded-md bg-red-50 px-3 py-2 text-sm font-medium text-red-700" role="alert">
          ¡Quedan menos de 3 minutos! El examen está por terminar.
        </p>
      )}
    </header>
  )
}
