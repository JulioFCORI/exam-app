import { useEffect, useMemo, useState } from 'react'
import { validarCantidadPreguntas } from '../../lib/scoring.js'
import { PlanTemplate } from '../templates/PlanTemplate.jsx'
import { CargaBancoPanel } from '../organisms/CargaBancoPanel.jsx'
import { ConfiguracionExamenPanel } from '../organisms/ConfiguracionExamenPanel.jsx'
import { EstadoRecuperacionPanel } from '../organisms/EstadoRecuperacionPanel.jsx'
import { ConfirmModal } from '../molecules/ConfirmModal.jsx'

export function ExamPlanScreen({ exam }) {
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([])
  const [numPreguntas, setNumPreguntas] = useState(10)
  const [sinTiempo, setSinTiempo] = useState(true)
  const [minutos, setMinutos] = useState(30)
  const [errorLectura, setErrorLectura] = useState(null)
  const [advertencia, setAdvertencia] = useState(null)

  useEffect(() => {
    if (exam.banco) {
      setCategoriasSeleccionadas(exam.banco.categorias.map((categoria) => categoria.nombre))
    }
  }, [exam.banco])

  const categoriasAcreditadasSet = useMemo(
    () => new Set(exam.categoriasAcreditadas.map((c) => c.categoria)),
    [exam.categoriasAcreditadas],
  )

  function alternarCategoria(categoria) {
    setCategoriasSeleccionadas((actuales) =>
      actuales.includes(categoria) ? actuales.filter((c) => c !== categoria) : [...actuales, categoria],
    )
  }

  function manejarArchivoLeido(resultado) {
    if (!resultado.ok) {
      setErrorLectura(resultado.mensaje)
      return
    }
    setErrorLectura(null)
    exam.cargarBanco(resultado.data)
  }

  function iniciar() {
    exam.iniciarExamen({
      categoriasSeleccionadas,
      numPreguntas,
      tiempoLimite: sinTiempo ? null : minutos * 60,
    })
  }

  function solicitarInicio() {
    const disponibles = exam.contarPreguntasDisponibles(categoriasSeleccionadas)
    const resultado = validarCantidadPreguntas(numPreguntas, disponibles)
    if (resultado) {
      setAdvertencia(resultado)
      return
    }
    iniciar()
  }

  function confirmarPeseAAdvertencia() {
    setAdvertencia(null)
    iniciar()
  }

  return (
    <PlanTemplate
      carga={
        <CargaBancoPanel
          banco={exam.banco}
          errorBanco={exam.errorBanco}
          errorLectura={errorLectura}
          onArchivoLeido={manejarArchivoLeido}
        />
      }
      recuperacion={
        <EstadoRecuperacionPanel
          categoriasFallidas={exam.categoriasFallidas}
          categoriasAcreditadas={exam.categoriasAcreditadas}
          todasAcreditadas={exam.todasAcreditadas}
          onPracticar={exam.iniciarRecuperacion}
        />
      }
      configuracion={
        exam.banco && (
          <ConfiguracionExamenPanel
            categorias={exam.banco.categorias.map((categoria) => categoria.nombre)}
            categoriasSeleccionadas={categoriasSeleccionadas}
            onToggleCategoria={alternarCategoria}
            categoriasAcreditadasSet={categoriasAcreditadasSet}
            numPreguntas={numPreguntas}
            onCambiarNumPreguntas={setNumPreguntas}
            sinTiempo={sinTiempo}
            onToggleSinTiempo={() => setSinTiempo((valor) => !valor)}
            minutos={minutos}
            onCambiarMinutos={setMinutos}
            onIniciar={solicitarInicio}
          />
        )
      }
      modal={
        <ConfirmModal
          abierto={advertencia != null}
          titulo="Aviso"
          mensaje={advertencia?.mensaje}
          onConfirmar={confirmarPeseAAdvertencia}
          onCancelar={() => setAdvertencia(null)}
        />
      }
    />
  )
}
