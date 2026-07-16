import { Label } from '../atoms/Label.jsx'
import { Select } from '../atoms/Select.jsx'
import { Checkbox } from '../atoms/Checkbox.jsx'
import { Button } from '../atoms/Button.jsx'
import { CategoryCheckboxItem } from '../molecules/CategoryCheckboxItem.jsx'

const OPCIONES_NUM_PREGUNTAS = [10, 20, 30, 40, 50].map((n) => ({ value: n, label: String(n) }))

export function ConfiguracionExamenPanel({
  categorias,
  categoriasSeleccionadas,
  onToggleCategoria,
  categoriasAcreditadasSet,
  numPreguntas,
  onCambiarNumPreguntas,
  sinTiempo,
  onToggleSinTiempo,
  minutos,
  onCambiarMinutos,
  onIniciar,
}) {
  return (
    <section className="rounded-lg border border-slate-200 p-4">
      <h2 className="text-base font-semibold text-slate-900">Configura tu examen</h2>

      <div className="mt-3">
        <Label>Categorías</Label>
        <div className="mt-1 divide-y divide-slate-100">
          {categorias.map((categoria) => (
            <CategoryCheckboxItem
              key={categoria}
              nombre={categoria}
              checked={categoriasSeleccionadas.includes(categoria)}
              onChange={() => onToggleCategoria(categoria)}
              acreditada={categoriasAcreditadasSet.has(categoria)}
            />
          ))}
        </div>
      </div>

      <div className="mt-4">
        <Label htmlFor="num-preguntas">Número de preguntas</Label>
        <Select
          id="num-preguntas"
          value={numPreguntas}
          onChange={(evento) => onCambiarNumPreguntas(Number(evento.target.value))}
          options={OPCIONES_NUM_PREGUNTAS}
          className="mt-1"
        />
      </div>

      <div className="mt-4">
        <Checkbox id="sin-tiempo" checked={sinTiempo} onChange={onToggleSinTiempo} label="Sin tiempo límite" />
        {!sinTiempo && (
          <div className="mt-2">
            <Label htmlFor="minutos">Minutos</Label>
            <input
              id="minutos"
              type="number"
              min={1}
              value={minutos}
              onChange={(evento) => onCambiarMinutos(Number(evento.target.value))}
              className="mt-1 w-24 rounded-md border border-slate-300 px-3 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600"
            />
          </div>
        )}
      </div>

      <div className="mt-5">
        <Button onClick={onIniciar} disabled={categoriasSeleccionadas.length === 0}>
          Iniciar examen
        </Button>
      </div>
    </section>
  )
}
