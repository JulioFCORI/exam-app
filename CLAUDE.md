# Exam-APP - Sistema de Exámenes Diagnósticos Dinámicos

## 1. PROPÓSITO DEL PROYECTO
Aplicación web en React orientada a jóvenes que necesitan practicar para exámenes de admisión o diagnósticos. Permite cargar bancos de preguntas por JSON divididos en categorías, configurar exámenes personalizados y generar rutas de estudio personalizadas basadas en las áreas de oportunidad detectadas.

---

## 2. REGLAS DE NEGOCIO Y ALGORITMOS (CRÍTICO)
- **Nota de Acreditación:** El índice mínimo para aprobar cualquier examen o categoría es **8.0 / 10**.
- **Flujo de Recuperación (Fallback):**
  - Al terminar un examen de >1 categoría, si hay categorías con promedio < 8, se listan en orden ascendente (la peor calificación primero) en la pantalla principal.
  - Se le sugiere al usuario realizar exámenes individuales de esas categorías fallidas.
  - Al lanzar este examen de recuperación, se heredan los parámetros anteriores (tiempo, número de preguntas), pero limitado a la categoría fallida.
  - Este examen prioriza: 1) Preguntas falladas en el examen anterior, 2) Preguntas de esa categoría que no salieron en el examen anterior.
  - **Persistencia de Errores:** La memoria de fallos y categorías no acreditadas se mantiene hasta que se realice un nuevo examen de >1 categoría o se cargue un nuevo JSON.
  - **Acreditación:** Al pasar una categoría individual con >= 8, se marca como "Acreditado (✓)". Cuando todas estén acreditadas, se sugiere volver a tomar el examen completo original.
- **Validación de Cantidad de Preguntas:**
  - Si $PreguntasSolicitadas > TotalDisponibles$, mostrar modal: *"El examen puede repetir preguntas ya que el archivo tiene menos contenido"*.
  - Si $PreguntasSolicitadas \ge TotalDisponibles \times 1.3$ (30% más), mostrar modal: *"Es posible que se repitan preguntas con mucha más frecuencia ya que el examen es un 30% más grande que el archivo"*.

---

## 3. ARQUITECTURA DE PANTALLAS

### Pantalla 1: `Exam-Plan-Screen` (Configuración e Historial)
- **Carga de Datos:** Subida de archivo JSON (validado mediante esquema).
- **Parámetros:** Selector de cantidad de preguntas (10, 20, 30, 40, 50), configuración de tiempo máximo (o sin tiempo) y selección de categorías (por defecto, todas).
- **Estado de Recuperación:** Muestra el listado de categorías no acreditadas en orden ascendente con botón para iniciar práctica individual. Muestra checkmarks (✓) en categorías ya superadas.

### Pantalla 2: `Exam-Screen` (Aplicación)
- **Aleatoriedad:** Selección aleatoria balanceada de preguntas de las categorías elegidas, ordenadas de forma aleatoria.
- **Temporizador:**
  - Si es con tiempo: El contador es permanente. Al quedar 3 minutos, muestra una notificación de advertencia.
  - Si es sin tiempo: Muestra tiempo transcurrido con botón para ocultar/mostrar el cronómetro.
- **Acciones:** Botón "Finalizar" con modal de doble confirmación antes de redirigir.

### Pantalla 3: `Check-in` (Resultados e Historial)
- **Métricas:** Muestra la calificación final, destaca la categoría con mejor desempeño y la de peor desempeño (mostrando errores vs total de esa categoría).
- **Acciones:**
  - Botón "Salir": Regresa a `Exam-Plan-Screen`.
  - Botón "Ver Preguntas": Muestra la revisión del examen en orden ascendente con dos filtros:
    - **Filtro 1 (Estado):** Ver Todas / Solo Correctas / Solo Incorrectas.
    - **Filtro 2 (Categorías):** Selección múltiple de categorías a visualizar.

---

## 4. GUÍA DE DESARROLLO (HOW)
- **Gestión de Estado:** Centralizar el estado del examen en un custom hook (`src/hooks/useExam.js`) para controlar el flujo de pantallas y la memoria de fallos.
- **Persistencia:** Usar `localStorage` para guardar el historial de categorías acreditadas/no acreditadas y el JSON activo.
- **Estilos:** Diseño responsivo y limpio usando Tailwind CSS.
