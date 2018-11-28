# El patrón Contenedor-Presentador

Este patrón consiste en dividir un componente que tenga lógica y visualización en varios componentes en los que:

- Uno de los componentes se ocupa de la lógica (Contenedor)
- El resto de componentes se ocupa de la visualización de los datos (Presentadores)

El componente Contenedor no sabe cómo presentar los datos en el HTML. Los datos se los pasará a través de @Input a los componentes presentadores.

Los compnentes presentadores reciben a través de @Input los datos que deben presentar. Estos componentes saben cómo presentar los datos pero no saben manipularlos. Cuando quieren realizar alguna operación sobre los datos, se lo comunican al componente contenedor a través de @Outputs.

Ejercicio: Aplicar el **patrón Contenedor-Presentador** al componente **CRUD básico**. Se sugiere crear un módulo nuevo con los siguientes componentes:

- crud-container
- crud-add-presenter
- crud-list-presenter
- crud-edit-presenter

La estrategia de detección de cambios de los componentes debe ser **ChangeDetectionStrategy.onPush**

El ejercicio está resuelto en el módulo *contenedor-presentador*.

