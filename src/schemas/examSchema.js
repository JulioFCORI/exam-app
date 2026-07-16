import { z } from 'zod'

const preguntaSchema = z
  .object({
    id: z.string().min(1),
    enunciado: z.string().min(1),
    opciones: z.array(z.string().min(1)).min(2),
    respuestaCorrecta: z.number().int().min(0),
    // .nullish() acepta string, null o ausente: los exportadores de JSON suelen
    // emitir `null` para campos opcionales sin valor (ej. "imagen": null).
    explicacion: z.string().nullish(),
    imagen: z.string().nullish(),
  })
  .refine((pregunta) => pregunta.respuestaCorrecta < pregunta.opciones.length, {
    message: 'respuestaCorrecta debe ser un índice válido dentro de opciones',
    path: ['respuestaCorrecta'],
  })

const categoriaSchema = z.object({
  nombre: z.string().min(1),
  preguntas: z.array(preguntaSchema).min(1),
})

export const examSchema = z.object({
  titulo: z.string().min(1),
  categorias: z.array(categoriaSchema).min(1),
})

export function validateExamBank(data) {
  return examSchema.safeParse(data)
}
