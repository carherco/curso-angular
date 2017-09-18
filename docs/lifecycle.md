# Ciclo de vida de un componente

Un componente tiene un ciclo de vida gestionado por Angular.

Angular crea el componente, lo renderiza, crea y renderiza a sus "hijos", lo chequea cuando sus datos bindeados cambian y lo destruye antes de quitarlo del DOM.

Angular ofrece hooks de cada paso del ciclo de vida para proporcionar la habilidad de actuar cuando tienen lugar.

Una directiva tiene el mismo conjunto de *lifecycle hooks* excepto aquellos específicos al contenido del componente y las vistas.

IMAGEN DEL CICLO

## Sequencia del ciclo de vida

- **ngOnChanges():** 
Respond when Angular (re)sets data-bound input properties. The method receives a SimpleChanges object of current and previous property values.
Called before ngOnInit() and whenever one or more data-bound input properties change.
- **ngOnInit():**	
Initialize the directive/component after Angular first displays the data-bound properties and sets the directive/component's input properties.
Called once, after the first ngOnChanges().
- **ngDoCheck():**
Detect and act upon changes that Angular can't or won't detect on its own.
Called during every change detection run, immediately after ngOnChanges() and ngOnInit().
- **ngAfterContentInit():**
Respond after Angular projects external content into the component's view.
Called once after the first ngDoCheck().
A component-only hook.
- **ngAfterContentChecked():**	
Respond after Angular checks the content projected into the component.
Called after the ngAfterContentInit() and every subsequent ngDoCheck().
A component-only hook.
- **ngAfterViewInit():**	
Respond after Angular initializes the component's views and child views.
Called once after the first ngAfterContentChecked().
A component-only hook.
- **ngAfterViewChecked():**	
Respond after Angular checks the component's views and child views.
Called after the ngAfterViewInit and every subsequent ngAfterContentChecked().
A component-only hook.
- **ngOnDestroy():**
Cleanup just before Angular destroys the directive/component. Unsubscribe Observables and detach event handlers to avoid memory leaks.
Called just before Angular destroys the directive/component.
