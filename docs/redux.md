# Redux

Redux no hace rápido lo simple, si no mantenible lo complejo.

## Principios de Redux

- Single Source Of Truth
  - Cada pieza de información se almacena en un único lugar (STORE), independientemente de dónde sea creada, modificada o requerida.
- Read Only State
  - La información será de sólo lectura y sólo podrá modificarse a través de conductos oficiales (ACTIONS).
- Changes By Pure Functions
  - Para especificar como el árbol de estado es transformado por las acciones, se utilizan funciones puras* (REDUCERS).
  - Los cambios tienen que poder ser replicados, cancelados y auditados.

Funciones puras:

- Retornan el mismo resultado para la misma entrada.
- No dependen del entorno ni de condiciones azarosas; sólo de sus argumentos.
- Sin efectos colaterales ni modificaciones del valor de sus parámetros u otras variables del entorno.

## Elementos de Redux

- Store
  - Despacha acciones de mutado
  - Mantiene el estado y controla su acceso en modo sólo lectura.

- State
  - Objeto en memoria que contiene la única copia válida de la información.
  - Representa el valor o el estado del store en un momento determinado.

- Actions
  - Objetos con un tipo predefinido y un potencial argumento llamado payload.
  - Representan todas las posibles mutaciones que pueden afectar al estado del store.

- Reducers
  - Son funciones puras*, las únicas que pueden mutar el estado.
  - Reciben el estado actual (STATE) y una acción (ACTION).
  - Clonan el estado, realizan los cambios oportunos y devuelven el estado mutado.
