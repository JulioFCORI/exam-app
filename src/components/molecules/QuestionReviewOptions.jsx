import { ReviewOptionItem } from '../atoms/ReviewOptionItem.jsx'

export function QuestionReviewOptions({ opciones, respuestaCorrecta, opcionSeleccionada }) {
  return (
    <ul className="mt-3 flex flex-col gap-2">
      {opciones.map((texto, indice) => (
        <ReviewOptionItem
          key={indice}
          texto={texto}
          esCorrecta={indice === respuestaCorrecta}
          esSeleccionada={indice === opcionSeleccionada}
        />
      ))}
    </ul>
  )
}
