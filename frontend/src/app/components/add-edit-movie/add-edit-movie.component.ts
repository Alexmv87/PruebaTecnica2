import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwIfEmpty } from 'rxjs';
import { Movie } from 'src/app/interfaces/movie';
import { ProductService } from 'src/app/services/movie.service';
import { CategoriaComponent } from '../categoria/categoria.component';
import { CategoriasService } from '../../services/categorias.service'
@Component({
  selector: 'app-add-edit-movie',
  templateUrl: './add-edit-movie.component.html',
  styleUrls: ['./add-edit-movie.component.css']
})

export class AddEditMovieComponent implements OnInit {
  form: FormGroup;  
  valid: boolean = false
  loading: boolean = false;
  id: string | null;
  operacion: string = 'Agregar ';
  Imagen: string = "";
  conIma:boolean = false
  
  constructor(private fb: FormBuilder,
    private _productService: ProductService,
    private _catService:CategoriasService,
    private Sanitazer: DomSanitizer,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute) {
    this.form = this.fb.group({
      Titulo: ['', Validators.required],
      Sinopsis: ['', Validators.required],
      Actores: ['', Validators.required],
      Categorias: [''],
      Imagen: ['']
    })
    this.id = aRouter.snapshot.paramMap.get('id')    
  }
  
  ngOnInit(): void {

    if (this.id) {      
      this.operacion = 'Editar ';
      this.getProduct(this.id);
    }
    else{
      this._catService.listado = []
      this.Imagen = "";
    }
    this.valid = (this.form.valid && this.conIma && this._catService.listado.length>0)
  }
  
  AgregaCategoria(){
    if(this.form.get("Categorias")?.value != ""){
      this._catService.AgregarCategoria(this.form.get("Categorias")?.value)
    }
    this.form.get("Categorias")?.reset()   
    this.valid = (this.form.valid && this.conIma && this._catService.listado.length>0) 
    console.log(this.valid)
  }
 

  subirImagen(event:any){
    const Archivo = event.target.files
    this.extraerB64(Archivo)
    
  }
  validar(){
    if(this.form.valid && this.conIma && this._catService.listado.length >0){
      this.addProduct()
    }
    else{
      alert("aún no se ha completado el formulario")
    }
    
  }

  extraerB64(files: FileList) {
    const file = files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const base64String = reader.result as string;
      this.Imagen = `${base64String}`;  
      this.conIma = true    
      
    };
    reader.readAsDataURL(file);    
  }

  getProduct(id: string|null) {
    this.loading = true;
    this._productService.getMovie(id).subscribe((data: Movie) => {
      this.loading = false;
      this._catService.listado = data.Categorias
      this.form.setValue({
        Titulo: data.Titulo,
        Sinopsis: data.Sinopsis,
        Actores: data.Actores[0],
        Categorias: "",
        Imagen:""
      })
      this.Imagen = data.Image
      this.conIma = true 
    })
  }

  addProduct() {
    const movie: Movie = {
      Titulo: this.form.value.Titulo,
      Sinopsis: this.form.value.Sinopsis,
      Image:this.Imagen,
      Actores: this.form.value.Actores,
      Categorias: this._catService.listado
    }
    this.loading = true;

    if (this.id) {
      // Es editar 
      movie._id = this.id;
      console.log(movie._id)
      this._productService.updateMovie(this.id, movie).subscribe(() => {
        this.toastr.info(`La pelicula ${movie.Titulo} fue actualizado con exito`, 'Pelicula actualizada');
        this.loading = false;
        this.router.navigate(['/']);
      })

    } else {
      // Es agregagar
      this._productService.saveMovie(movie).subscribe(() => {
        this.toastr.success(`La pelicula ${movie.Titulo} fue registrada con exito`, 'Pelicula registrada');
        this.loading = false;
        this.router.navigate(['/']);
      })
    }




  }

}
