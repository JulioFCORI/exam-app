import { twMerge } from 'tailwind-merge'

export function Label({ htmlFor, children, className }) {
  return (
    <label htmlFor={htmlFor} className={twMerge('block text-sm font-medium text-slate-700', className)}>
      {children}
    </label>
  )
}
