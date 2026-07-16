import { RecoveryCategoryItem } from '../molecules/RecoveryCategoryItem.jsx'
import { Badge } from '../atoms/Badge.jsx'

export function EstadoRecuperacionPanel({ categoriasFallidas, categoriasAcreditadas, todasAcreditadas, onPracticar }) {
  if (categoriasFallidas.length === 0 && categoriasAcreditadas.length === 0) return null

  return (
    <section className="rounded-lg border border-slate-200 p-4">
      <h2 className="text-base font-semibold text-slate-900">Estado de recuperación</h2>

      {todasAcreditadas && (
        <p className="mt-2 text-sm text-green-700">
          Todas las categorías están acreditadas. Puedes volver a tomar el examen completo.
        </p>
      )}

      {categoriasFallidas.length > 0 && (
        <ul className="mt-3 divide-y divide-slate-100">
          {categoriasFallidas.map(({ categoria, ultimaCalificacion }) => (
            <RecoveryCategoryItem
              key={categoria}
              categoria={categoria}
              ultimaCalificacion={ultimaCalificacion}
              onPracticar={onPracticar}
            />
          ))}
        </ul>
      )}

      {categoriasAcreditadas.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {categoriasAcreditadas.map(({ categoria }) => (
            <Badge key={categoria} tono="exito">
              ✓ {categoria}
            </Badge>
          ))}
        </div>
      )}
    </section>
  )
}
