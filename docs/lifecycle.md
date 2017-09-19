# Ciclo de vida de un componente

Un componente tiene un ciclo de vida gestionado por Angular.

Angular crea el componente, lo renderiza, crea y renderiza a sus "hijos", lo chequea cuando sus datos bindeados cambian y lo destruye antes de quitarlo del DOM.

Angular ofrece hooks de cada paso del ciclo de vida para proporcionar la habilidad de actuar cuando tienen lugar.

Una directiva tiene el mismo conjunto de *lifecycle hooks* excepto aquellos específicos al contenido del componente y las vistas.

![Ciclo de vida de un componente](img/lifecycle.png "Ciclo de vida de un componente")

## Sequencia del ciclo de vida

- **ngOnChanges():** 
Es llamado cuando Angular establece datos asociados a propiedades asociadas a @Input. El método recibe un objetco SimpleChanges con el valor actual y el valor anterior.
Es llamado antes de ngOnInit() y cuando uno o más @Input variables cambie.
- **ngOnInit():**	
Initialize the directive/component after Angular first displays the data-bound properties and sets the directive/component's input properties.
Called once, after the first ngOnChanges().
- **ngDoCheck():**
Para checkear cambios que Angular no sea capaz de detectar por sí mismo. Es llamado después de cada ngOnChanges() y ngOnInit().
- **ngAfterContentInit():**
Es llamado después de que Angular proyecte el contenido externo dentro de la vista del componente. Es llamado después del primer ngDoCheck().
Sólo disponible para componentes.
- **ngAfterContentChecked():**	
Respond after Angular checks the content projected into the component.
Called after the ngAfterContentInit() and every subsequent ngDoCheck().
Sólo disponible para componentes.
- **ngAfterViewInit():**	
Respond after Angular initializes the component's views and child views.
Called once after the first ngAfterContentChecked().
Sólo disponible para componentes.
- **ngAfterViewChecked():**	
Respond after Angular checks the component's views and child views.
Called after the ngAfterViewInit and every subsequent ngAfterContentChecked().
Sólo disponible para componentes.
- **ngOnDestroy():**
Cleanup just before Angular destroys the directive/component. Unsubscribe Observables and detach event handlers to avoid memory leaks.
Called just before Angular destroys the directive/component.
