import { OptionButton } from '../atoms/OptionButton.jsx'

export function QuestionOptionsList({ opciones, seleccionada, onSeleccionar }) {
  return (
    <div className="mt-3 flex flex-col gap-2" role="radiogroup">
      {opciones.map((texto, indice) => (
        <OptionButton key={indice} texto={texto} seleccionada={seleccionada === indice} onClick={() => onSeleccionar(indice)} />
      ))}
    </div>
  )
}
