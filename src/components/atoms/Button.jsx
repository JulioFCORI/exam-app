import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

const VARIANTES = {
  primario: 'bg-blue-600 text-white hover:bg-blue-700 focus-visible:outline-blue-600',
  secundario: 'bg-slate-200 text-slate-800 hover:bg-slate-300 focus-visible:outline-slate-500',
  advertencia: 'bg-amber-500 text-white hover:bg-amber-600 focus-visible:outline-amber-500',
}

export function Button({ variante = 'primario', className, children, ...props }) {
  return (
    <button
      type="button"
      className={twMerge(
        clsx(
          'rounded-md px-4 py-2 text-sm font-medium transition-colors',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
          VARIANTES[variante],
        ),
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
