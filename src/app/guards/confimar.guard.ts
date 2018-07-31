import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from '@angular/router';
import { TemplateFormComponent } from '../components/template-form/template-form.component';

@Injectable({
  providedIn: 'root'
})
export class ConfimarGuard implements CanDeactivate<TemplateFormComponent> {

  canDeactivate( target: TemplateFormComponent,
                 next: ActivatedRouteSnapshot,
                 state: RouterStateSnapshot
               ): boolean {

    if (target.tieneCambiosSinGuardar()) {
      let respuesta = window.confirm('Tienes cambios sin guardar. ¿Seguro que quieres salir?');
      return respuesta;
    }
    return true;
  }

}
