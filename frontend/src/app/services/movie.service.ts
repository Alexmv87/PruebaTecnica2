import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movie } from '../interfaces/movie';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private myAppUrl: string;  

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint    
  }

  getListMovies(): Observable<Movie[]> {    
   return this.http.get<Movie[]>(`${this.myAppUrl}`);
  }

  deleteMovie(id: string | undefined): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}/${id}`)
  }

  saveMovie(product: Movie): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}`,product)
  }

  getMovie(id: string| null): Observable<Movie> {
    return this.http.get<Movie>(`${this.myAppUrl}/${id}`)
  }

  updateMovie(id: string | undefined, product: Movie): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}/${id}`, product);
  }
}
