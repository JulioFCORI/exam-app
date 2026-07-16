import { Label } from '../atoms/Label.jsx'

export function FileUploadField({ id, label, onArchivoLeido }) {
  function manejarCambio(evento) {
    const archivo = evento.target.files?.[0]
    evento.target.value = ''
    if (!archivo) return

    const lector = new FileReader()
    lector.onload = () => {
      try {
        const data = JSON.parse(String(lector.result))
        onArchivoLeido({ ok: true, data })
      } catch {
        onArchivoLeido({ ok: false, mensaje: 'El archivo no contiene JSON válido' })
      }
    }
    lector.readAsText(archivo)
  }

  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <input
        id={id}
        type="file"
        accept="application/json"
        onChange={manejarCambio}
        className="mt-1 block w-full text-sm text-slate-600 file:mr-3 file:rounded-md file:border-0 file:bg-blue-50 file:px-3 file:py-2 file:text-sm file:font-medium file:text-blue-700 hover:file:bg-blue-100"
      />
    </div>
  )
}
