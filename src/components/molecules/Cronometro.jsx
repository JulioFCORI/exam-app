import { Button } from '../atoms/Button.jsx'

function formatearTiempo(segundosTotales) {
  const segundos = Math.max(0, segundosTotales ?? 0)
  const minutos = Math.floor(segundos / 60)
  const restoSegundos = segundos % 60
  return `${String(minutos).padStart(2, '0')}:${String(restoSegundos).padStart(2, '0')}`
}

export function Cronometro({
  tiempoLimite,
  tiempoRestante,
  tiempoTranscurrido,
  mostrarCronometro,
  advertencia,
  onToggle,
}) {
  const conTiempo = tiempoLimite != null

  if (conTiempo) {
    return (
      <div
        role="timer"
        aria-live="polite"
        className={advertencia ? 'text-lg font-semibold text-red-600' : 'text-lg font-semibold text-slate-700'}
      >
        Tiempo restante: {formatearTiempo(tiempoRestante)}
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3">
      <span role="timer" aria-live="polite" className="text-lg font-semibold text-slate-700">
        {mostrarCronometro ? `Tiempo transcurrido: ${formatearTiempo(tiempoTranscurrido)}` : 'Cronómetro oculto'}
      </span>
      <Button variante="secundario" onClick={onToggle}>
        {mostrarCronometro ? 'Ocultar' : 'Mostrar'}
      </Button>
    </div>
  )
}
