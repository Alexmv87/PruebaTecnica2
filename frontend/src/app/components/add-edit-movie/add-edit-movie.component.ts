import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwIfEmpty } from 'rxjs';
import { Movie } from 'src/app/interfaces/movie';
import { ProductService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-add-edit-movie',
  templateUrl: './add-edit-movie.component.html',
  styleUrls: ['./add-edit-movie.component.css']
})

export class AddEditMovieComponent implements OnInit {
  form: FormGroup;
  
  loading: boolean = false;
  id: string | null;
  operacion: string = 'Agregar ';
  Imagen: string;
  constructor(private fb: FormBuilder,
    private _productService: ProductService,
    private Sanitazer: DomSanitizer,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute) {
    this.form = this.fb.group({
      Titulo: ['', Validators.required],
      Sinopsis: ['', Validators.required],
      Actores: ['', Validators.required],
      Categorias: ['', Validators.required],
      Imagen: ['', Validators.required]
    })
    this.id = aRouter.snapshot.paramMap.get('id')
    this.Imagen = "";
  }
  
  ngOnInit(): void {

    if (this.id) {
      // Es editar
      this.operacion = 'Editar ';
      this.getProduct(this.id);

    }
  }

  subirImagen(event:any){
    const Archivo = event.target.files
    const datos = this.extraerB64(Archivo)
    
  }

  extraerB64(files: FileList) {
    const file = files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const base64String = reader.result as string;
      this.Imagen = `${base64String}`;      
    };

    reader.readAsDataURL(file);
    
  }



  getProduct(id: string|null) {
    this.loading = true;
    this._productService.getMovie(id).subscribe((data: Movie) => {
      this.loading = false;
      this.form.setValue({
        Titulo: data.Titulo,
        Sinopsis: data.Sinopsis,
        Actores: data.Actores[0],
        Categorias: data.Categorias[0],
        Imagen:""
      })
    })
  }

  addProduct() {
    
    console.log(this.form.get("Imagen")?.value)
    const movie: Movie = {
      Titulo: this.form.value.Titulo,
      Sinopsis: this.form.value.Sinopsis,
      Image:this.Imagen,
      Actores: this.form.value.Actores,
      Categorias: this.form.value.Categorias
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
