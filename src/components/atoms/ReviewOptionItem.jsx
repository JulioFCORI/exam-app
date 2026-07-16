import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function ReviewOptionItem({ texto, esCorrecta, esSeleccionada }) {
  return (
    <li
      className={twMerge(
        clsx(
          'rounded-md border px-3 py-2 text-sm',
          esCorrecta && 'border-green-600 bg-green-50 text-green-800',
          !esCorrecta && esSeleccionada && 'border-red-600 bg-red-50 text-red-800',
          !esCorrecta && !esSeleccionada && 'border-slate-200 text-slate-600',
        ),
      )}
    >
      {texto}
      {esCorrecta && ' ✓'}
      {!esCorrecta && esSeleccionada && ' ✗ (tu respuesta)'}
    </li>
  )
}
