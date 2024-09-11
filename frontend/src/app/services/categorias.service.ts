import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  listado:string[] = []
  constructor() { }
  
  AgregarCategoria(categoria:string){
    if (!this.listado.includes(categoria)&&categoria.toString().trim()!=""){
      this.listado.push(categoria)
    }    
  }

  LeerCategorias(){
    return this.listado
  }

  eliminarCategoria(categoria:string){
    const padre = document.getElementById('Categorias')
    this.listado.forEach((cat,index)=>{
      if (cat==categoria){
        this.listado.splice(index,1)
      }
    })

    padre?.childNodes.forEach((child,index)=>{
      if (padre.children.item(index)?.textContent?.toString().trimEnd() ==categoria){
        child.remove()
      }
    })
  }
}
