# Pipes puras e impuras

Las pipes puras detectan cambios en las variables pero no detectan cambios  de arrays u objetos. Consideran que la función *transform()* es una **función pura** y que estamos siguiendo el patrón **Inmutable**.

Las pipes impuras no consideran los datos Inmutables por lo que **se ejecutan en cada ciclo de detección de cambios**.

Para crear una pipe impura hay que indicar en los metadatos del decorador *pure:false*.

```typescript
@Pipe({
  name: 'exponentialStrength',
  pure: false
})
```

Todas las pipes del core de Angular son puras excepto *AsyncPipe*, *JsonPipe* y *SlicePipe*. 
