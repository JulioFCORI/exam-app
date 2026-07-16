import { Button } from '../atoms/Button.jsx'

export function RecoveryCategoryItem({ categoria, ultimaCalificacion, onPracticar }) {
  return (
    <li className="flex items-center justify-between py-2">
      <span className="text-sm text-slate-700">
        {categoria} — calificación: {ultimaCalificacion}
      </span>
      <Button variante="advertencia" onClick={() => onPracticar(categoria)}>
        Practicar
      </Button>
    </li>
  )
}
