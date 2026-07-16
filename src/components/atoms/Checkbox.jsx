import { twMerge } from 'tailwind-merge'

export function Checkbox({ id, checked, onChange, label, className }) {
  return (
    <label htmlFor={id} className={twMerge('flex items-center gap-2 text-sm text-slate-700', className)}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 rounded border-slate-300 text-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600"
      />
      {label}
    </label>
  )
}
