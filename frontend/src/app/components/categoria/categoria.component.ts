import { Component, OnInit } from '@angular/core';
import { CategoriasService } from 'src/app/services/categorias.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {
  listCategorys: string[]= []
  constructor(private _catService: CategoriasService) {
    this.listCategorys = _catService.listado
   }

  ngOnInit(): void {
  }


  quitar(event:any){
    
    this._catService.eliminarCategoria(event.target.parentNode.textContent.toString().trimEnd())
    this.listCategorys=this._catService.listado
  }
}
