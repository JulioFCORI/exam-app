import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function OptionButton({ texto, seleccionada, onClick }) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={seleccionada}
      onClick={onClick}
      className={twMerge(
        clsx(
          'rounded-md border px-4 py-2 text-left text-sm transition-colors',
          'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600',
          seleccionada
            ? 'border-blue-600 bg-blue-50 text-blue-800'
            : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50',
        ),
      )}
    >
      {texto}
    </button>
  )
}
