import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Movie } from 'src/app/interfaces/movie';
import { ProductService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-list-movies',
  templateUrl: './list-movies.component.html',
  styleUrls: ['./list-movies.component.css']
})
export class ListMoviesComponent implements OnInit {
  listMovies: Movie[] = []
  loading: boolean = false;
  checked:boolean=true;
  constructor(private _productService: ProductService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getListMovies();
  }
  ordenToogle(event:any){
    this.listMovies = this.listMovies.reverse()
  }
  
  getListMovies() {
    this.loading = true;    
    this._productService.getListMovies().subscribe((data: Movie[]) => {
      this.listMovies = data;
      this.loading = false;
    })
  }

  deleteProduct(id: string|undefined) {
    this.loading = true;
    this._productService.deleteMovie(id).subscribe(() => {
      this.getListMovies();
      this.toastr.warning('La película fue eliminada con exito', 'Película eliminada');
    })
  }
}
