import { Button } from '../atoms/Button.jsx'

const OPCIONES = [
  { valor: 'todas', etiqueta: 'Ver todas' },
  { valor: 'correctas', etiqueta: 'Solo correctas' },
  { valor: 'incorrectas', etiqueta: 'Solo incorrectas' },
]

export function FiltroEstado({ valor, onCambiar }) {
  return (
    <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Filtrar por estado">
      {OPCIONES.map((opcion) => (
        <Button
          key={opcion.valor}
          variante={valor === opcion.valor ? 'primario' : 'secundario'}
          onClick={() => onCambiar(opcion.valor)}
          aria-pressed={valor === opcion.valor}
        >
          {opcion.etiqueta}
        </Button>
      ))}
    </div>
  )
}
