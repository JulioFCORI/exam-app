import { twMerge } from 'tailwind-merge'

export function Select({ id, value, onChange, options, className, ...props }) {
  return (
    <select
      id={id}
      value={value}
      onChange={onChange}
      className={twMerge(
        'w-full rounded-md border border-slate-300 px-3 py-2 text-sm',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600',
        className,
      )}
      {...props}
    >
      {options.map((opcion) => (
        <option key={opcion.value} value={opcion.value}>
          {opcion.label}
        </option>
      ))}
    </select>
  )
}
