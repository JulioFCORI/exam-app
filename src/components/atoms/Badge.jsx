import { twMerge } from 'tailwind-merge'

const TONOS = {
  exito: 'bg-green-100 text-green-800',
  alerta: 'bg-amber-100 text-amber-800',
  error: 'bg-red-100 text-red-800',
}

export function Badge({ children, tono = 'exito', className }) {
  return (
    <span
      className={twMerge(
        'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold',
        TONOS[tono],
        className,
      )}
    >
      {children}
    </span>
  )
}
