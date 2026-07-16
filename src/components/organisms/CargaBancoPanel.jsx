import { FileUploadField } from '../molecules/FileUploadField.jsx'

export function CargaBancoPanel({ banco, errorBanco, errorLectura, onArchivoLeido }) {
  return (
    <section className="rounded-lg border border-slate-200 p-4">
      <h2 className="text-base font-semibold text-slate-900">Banco de preguntas</h2>

      <div className="mt-3">
        <FileUploadField id="archivo-banco" label="Sube el archivo JSON del examen" onArchivoLeido={onArchivoLeido} />
      </div>

      {banco && !errorBanco && !errorLectura && (
        <p className="mt-2 text-sm text-green-700">Cargado: {banco.titulo}</p>
      )}
      {errorLectura && <p className="mt-2 text-sm text-red-600">{errorLectura}</p>}
      {errorBanco && (
        <p className="mt-2 text-sm text-red-600">
          El archivo no cumple el formato esperado. Revisa categorías, preguntas y opciones.
        </p>
      )}
    </section>
  )
}
