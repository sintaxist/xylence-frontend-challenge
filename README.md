# Notas — Prueba Técnica Xylence (Senior Frontend UI/UX)

Hola equipo de Xylence, en especial a Antonio.

Gracias por la oportunidad de realizar esta prueba técnica. Aunque el scope inicial era manejable, decidí dedicar tiempo adicional durante el fin de semana para pulir detalles. Prefiero no entregar componentes o features que no me convencen completamente, priorizando siempre cuidar la calidad final de la entrega.

A continuación, detallo mi proceso, decisiones y observaciones sobre el proyecto:

---

## 1. Diseño y Experiencia de Usuario (UX)

Para el diseño, realicé un benchmark rápido de productos en el ámbito de inversión, trading y banca (principalmente **GBM** y **Revolut**), ya que son excelentes referentes en claridad y manejo de información densa. 

* **Proceso Inicial:** Antes de escribir código, tracé wireframes rápidos en una libreta para definir la estructura y jerarquía, evitando iteraciones costosas en el código.
* **Paleta de Colores:** Opté por una paleta sobria de tonos neutros con un único color de acento (`#CDF258`). Dado que la interfaz ya incorpora múltiples elementos visuales (score, banderas, etc.), limitar los colores previene la saturación visual.
* **Conviction Score:** Se presenta de forma destacada y con color al ser el principal indicador de decisión. Agregué un ícono informativo (`i`) para dar contexto, ya que es un concepto propio del producto.
* **Modal de Detalles:** Decidí no repetir la información de la Card. El modal se enfoca en datos profundos (como las *signals*) e incluye un botón de "Guardar" como placeholder para futuras funcionalidades. A futuro, este modal podría evolucionar a un "showroom" completo de la startup, pero para el alcance actual, esta vista es precisa y suficiente.

## 2. Desarrollo y Arquitectura

Este reto fue una excelente oportunidad para consolidar mis habilidades con **TypeScript**, integrándolo de forma estricta con React.

* **Flujo de Trabajo:** Prioricé la construcción del ecosistema de la Card (`StartupCard`, `ModalCard`, Skeletons y animaciones de entrada). Suelo enfocarme en cerrar una feature completa a la vez para asegurar su calidad.
* **Lógica de Filtros y Estado:** Implementar los filtros fue el mayor reto lógico. Comencé con un estado local, pero **refactoricé hacia un custom hook** (`useStartupFilters`) para mejorar la escalabilidad y limpieza del código. 
* **Deep Linking:** Integré los filtros con los *query params* de la URL. Esto permite que el estado de la búsqueda pueda compartirse fácilmente a través de un enlace, aportando gran valor a la UX.
* **Detalles Finales:** Los *empty states* y estados de selección los abordé al final, con el flujo principal ya estable. Además, incluí un **Modo Oscuro** nativo con Tailwind, ya que es un estándar en mis entregas.

## 3. Inconsistencias y Observaciones del Scaffold Base

Durante el desarrollo, noté ciertas rarezas en el código base. Decidí manejarlas a nivel de UI para proteger la aplicación:

* **Inconsistencias de Datos:** `fundingAmount` no siempre está presente (aunque se usa para ordenar), y hay valores fuera de rango en `signals.weight` y `foundedYear`. Como `signals` no garantiza contenido, implementé un *Empty State* ("Modo Stealth") en el modal.
* **Formato de Moneda:** Al no haber garantías sobre la normalización de la moneda en el mock, creé una función `formatCurrency` asumiendo que los valores base están en MXN.
* **Arquitectura del Mock:** El archivo `api/mock.ts` mezcla datos, lógica de fetch y simulación de latencia. En un entorno real, separaría esto en capas (`api/client.ts`, `api/startups.ts`, `/mocks`). Similarmente, `types/index.ts` centraliza todo, lo cual escalaría mejor separado por dominios.
* **Manejo de Errores:** Noté que existe una interfaz `ApiError` pero no se utiliza en `fetchStartups`, limitando el realismo en la simulación de fallos.

## 4. Qué Haría Diferente con Más Tiempo

La honestidad técnica es fundamental para mí. Con más tiempo, implementaría:

1. **Virtualización del Grid:** Actualmente `StartupGrid` renderiza todo el DOM. Si los registros crecen a miles, usaría `@tanstack/react-virtual` para renderizar solo lo visible.
2. **Paginación / Infinite Scroll:** Estructuraría mejor los llamados a la API para soportar un *fetching* incremental, evitando cargas masivas.
3. **Mobile First & Responsive:** Dedicaría mayor prioridad a micro-optimizar la experiencia móvil, clave desde la perspectiva de accesibilidad.
4. **Testing:** Aunque tengo bases en testing, dedicaría un esfuerzo específico a cubrir la lógica crítica (como el hook de filtros) mediante pruebas unitarias robustas.

## 5. Colaboración con IA

Utilicé IA como un copiloto para acelerar ciertas tareas, manteniendo yo el control de la arquitectura:

* **Tipado Estricto:** Fue de gran ayuda para validar y complementar la sintaxis en TypeScript, particularmente en los retos de tipado al leer de la URL en el `useStartupFilters`.
* **Boilerplate & CSS:** La usé como punto de partida para los *Skeletons* y para destrabar algunos problemas de renderizado con el dropdown de ordenación. Posteriormente, limpié y refiné ese código generado a mano.
* **Testing (Descartado):** Hice intentos de generar tests con IA, pero decidí no incluirlos. Prefiero no entregar código (ni siquiera tests) del que no estoy 100% convencido. Opté por dejarlo fuera del scope antes que asumir que la IA garantizaba su calidad.