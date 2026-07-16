import { Checkbox } from '../atoms/Checkbox.jsx'

export function FiltroCategorias({ categorias, seleccionadas, onToggle }) {
  return (
    <div className="flex flex-wrap gap-3">
      {categorias.map((categoria) => (
        <Checkbox
          key={categoria}
          id={`filtro-categoria-${categoria}`}
          checked={seleccionadas.includes(categoria)}
          onChange={() => onToggle(categoria)}
          label={categoria}
        />
      ))}
    </div>
  )
}
