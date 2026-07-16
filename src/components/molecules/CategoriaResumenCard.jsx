import { Badge } from '../atoms/Badge.jsx'

export function CategoriaResumenCard({ titulo, categoria, calificacion, correctas, total, acreditada }) {
  return (
    <div className="rounded-md border border-slate-200 p-3">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">{titulo}</p>
      <p className="mt-1 text-base font-semibold text-slate-900">{categoria}</p>
      <p className="mt-1 text-sm text-slate-600">
        Calificación: {calificacion} · Errores: {total - correctas}/{total}
      </p>
      <Badge tono={acreditada ? 'exito' : 'error'} className="mt-2">
        {acreditada ? '✓ Acreditado' : 'No acreditado'}
      </Badge>
    </div>
  )
}
