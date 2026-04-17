# Xylence — Senior Frontend UI/UX Challenge

> Prueba técnica take-home para el rol de **Senior UI/UX Frontend Engineer**.
> Tiempo estimado: **4–6 horas**. Plazo de entrega: **5 Días** desde que recibiste este repo.

---

## 1. Contexto del producto

**Xylence** es una plataforma de *inteligencia predictiva para venture capital en LATAM*. Ingerimos señales públicas y privadas sobre startups (contratación, tracción, menciones, fundadores, métricas de producto) y las sintetizamos en un **conviction score** — un indicador entre 0 y 100 que resume la probabilidad de que una startup se convierta en un outlier.

Nuestros usuarios son **analistas de VC** que pasan de 4 a 6 horas diarias dentro del dashboard revisando deals, comparando señales y decidiendo a quién contactar esta semana. Lo que más les importa:

- **Velocidad de escaneo.** Necesitan descartar 50 startups en 20 minutos y quedarse con 5 que merezcan una llamada.
- **Confianza en la señal.** No basta con mostrar un número; necesitan entender *por qué* el score es alto o bajo.
- **Bajo ruido visual.** El dashboard es su herramienta de trabajo, no un showcase.

Con eso en mente, construye algo que un analista usaría con gusto todos los días.

---

## 2. El ejercicio

Construye un **Startup Intelligence Feed** — una vista de lista o grid que muestre startups provenientes del mock API incluido en [src/api/mock.ts](src/api/mock.ts), con filtros y ordenamiento.

El `App.tsx` actual es solo un shell vacío con el título. Todo lo demás es tuyo: componentes, estilos, estructura de carpetas, decisiones de UX.

> **Sobre el scope.** Preferimos un `StartupCard` y una jerarquía de lista con criterio impecable que una lista larga de features a medias. Si tienes que elegir, pule lo base antes de tocar los opcionales. El criterio de qué dejar fuera también es parte de lo que evaluamos.

### 2.1. Requerido (base)

Tu entrega debe cumplir al menos con esto:

1. **Renderizar** la lista de startups consumida desde `fetchStartups()` vía **React Query**.
2. **Loading state** mientras carga — usa un **skeleton** de la card, no un spinner genérico. Los analistas lo ven 30+ veces al día; cuenta.
3. **Componente `StartupCard`** que muestre al menos:
   - Nombre
   - Stage
   - Tags de sector
   - **Conviction score** como un indicador visual (barra, anillo, heatbar, dot pattern — tú eliges; en tus decisiones de diseño justifica la elección)
   - Trend indicator (up / down / neutral)
   - País
4. **Filtros funcionales** por:
   - Stage (multi-select)
   - Sector (multi-select)
   - País (multi-select)
5. **Ordenamiento** por:
   - Conviction score
   - Funding amount
   - Founded year

### 2.2. Opcional (diferenciadores)

No tienes que hacer todos. Son oportunidades para mostrar profundidad donde te importe:

- Animación de entrada de las cards al cargar o al cambiar filtros
- Expandir una card para ver los `ConvictionSignals` como breakdown visual (por tipo: team / market / traction / product)
- Búsqueda en tiempo real por nombre (con debounce)
- Persistir filtros y búsqueda en la URL vía query params
- Al menos **1 test unitario** del componente que consideres más crítico
- Empty state bien diseñado cuando los filtros no devuelven resultados
- Responsive decente (no hace falta mobile-first, pero que no se rompa en 1024px)

---

## 3. Stack

- **React 18 + TypeScript** — obligatorio
- **Vite** — obligatorio
- **React Query** (`@tanstack/react-query`) — obligatorio para server state
- **Zustand** — úsalo si necesitas estado global (filtros, UI state); es opcional
- **CSS Modules o Tailwind** — tú eliges; sé consistente
- **Vitest + Testing Library** — para el test opcional
- **Sin librerías de UI externas** (MUI, Chakra, Radix, shadcn, Ant, etc.). Todo custom.
  - Excepción: sí puedes usar `lucide-react` u otro set de íconos. Justifícalo.

---

## 4. Cómo correr el proyecto

```bash
pnpm install
pnpm run dev
```

Otros scripts:

```bash
pnpm run build    # build de producción
pnpm run test     # Vitest en modo watch
pnpm run lint     # ESLint
```

---

## 5. Criterios de evaluación

Esto es lo que miramos. En orden de peso aproximado:

### Diseño visual & sensibilidad de UX (30%)
No buscamos que sea *perfecto* — buscamos que sea *intencional*. Minimalista o elaborado, ambos son válidos siempre que haya coherencia: tipografía, espaciado, jerarquía, color. ¿Cómo se siente al usarlo? ¿Un analista podría escanear 30 cards rápido sin fatiga?

### Arquitectura React/TypeScript (30%)
Composición de componentes, separación de responsabilidades, dónde vive cada pieza de lógica. ¿La `StartupCard` es pura o está acoplada al store? ¿Hay hooks que extraen lógica reutilizable? ¿El código escalaría si mañana añadimos 10 filtros más?

### Manejo de estado y data fetching (20%)
Uso correcto de React Query (query keys, stale time, loading/error states). Separación entre server state y UI state. Si usas Zustand, que tenga sentido y no duplique lo que React Query ya hace.

### Código limpio y tipado (20%)
Tipos precisos (sin `any` injustificados ni `as` para silenciar errores). Nombres claros. Sin código muerto ni archivos de andamio sin uso. Consistencia en el estilo.

### Lo que NO evaluamos
- **Pixel-perfect** con ningún diseño. No hay Figma, es intencional — queremos ver tu criterio.
- **Cantidad** de opcionales completados. Mejor 2 bien que 6 a medias.
- **Animaciones complejas.** Si las haces, que tengan propósito.
- **Cobertura de tests.** El test opcional es para ver *cómo* testeas, no cuánto.

---

## 6. Entrega

1. Súbelo a un repo público en tu GitHub.
2. Asegúrate de que corre con `pnpm install && pnpm run dev` sin errores.
3. Actualiza este README (o crea un `NOTES.md`) con:
   - **Decisiones de diseño** que tomaste (mínimo un párrafo). Queremos leer *por qué* elegiste X sobre Y, no *qué* hiciste.
   - **Qué decidí NO construir y por qué.** El scope es un ejercicio de criterio tanto como la implementación. Un senior tiene opiniones sobre lo que sobra.
   - **Inconsistencias o rarezas** que notaste en los datos o en el scaffold, aunque no las hayas "arreglado". Lo que ves y decides no tocar cuenta tanto como lo que construyes.
   - **Qué harías diferente con más tiempo.** Honestidad > perfección.
   - **Cómo colaboraste con IA**, si aplica. No penalizamos el uso — todos la usamos. Sí valoramos que nos cuentes en qué decisiones la voz final fue tuya y en cuáles cediste. La honestidad aquí pesa más que la pureza.
   - (Opcional) Screenshot o GIF corto del resultado.
4. Manda un email con el link al repo.

Si tienes una duda de scope, asume lo razonable y documéntalo. No te bloquees esperando respuesta.

---

## 7. Estructura inicial del repo

```
xylence-frontend-challenge/
├── README.md
├── package.json
├── tsconfig.json
├── vite.config.ts
├── index.html
└── src/
    ├── main.tsx              # entry + QueryClientProvider
    ├── App.tsx               # shell vacío — empieza aquí
    ├── index.css             # reset base mínimo
    ├── api/
    │   └── mock.ts           # fetchStartups() con delay simulado
    ├── types/
    │   └── index.ts          # Startup, ConvictionSignal, etc.
    └── assets/
        └── logo.png
```

Todo lo demás (componentes, hooks, styles, store, tests) lo organizas como veas. Nos interesa tu criterio.

---

Buena suerte. Estamos emocionados de ver qué construyes.