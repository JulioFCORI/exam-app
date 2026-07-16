import { Button } from '../atoms/Button.jsx'

export function ConfirmModal({
  abierto,
  titulo,
  mensaje,
  onConfirmar,
  onCancelar,
  textoConfirmar = 'Continuar',
  textoCancelar = 'Cancelar',
}) {
  if (!abierto) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" role="dialog" aria-modal="true">
      <div className="w-full max-w-sm rounded-lg bg-white p-5 shadow-lg">
        {titulo && <h2 className="text-lg font-semibold text-slate-900">{titulo}</h2>}
        <p className="mt-2 text-sm text-slate-600">{mensaje}</p>
        <div className="mt-4 flex justify-end gap-2">
          <Button variante="secundario" onClick={onCancelar}>
            {textoCancelar}
          </Button>
          <Button variante="primario" onClick={onConfirmar}>
            {textoConfirmar}
          </Button>
        </div>
      </div>
    </div>
  )
}
