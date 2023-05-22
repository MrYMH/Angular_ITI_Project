import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../Models/i-product';
import { Observable, catchError, observable, retry, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

//http://localhost:3000/products



export class ProductsService {
  private apiUrl:string = "http://localhost:3000";
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
      // Authorization: 'my-auth-token'
    })
  };

  // httpOptions.headers =
  // httpOptions.headers.set('Authorization', 'my-new-auth-token');

  constructor(private hc : HttpClient) { }


  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  getAll():Observable<IProduct[]>
  {
    return this.hc.get<IProduct[]>(`${this.apiUrl}/products`)
  }

  getProductsByCatId(catId: number):Observable<IProduct[]>
  {
    if(catId == 0){
      return this.hc.get<IProduct[]>(`${this.apiUrl}/products`)
    }
    else{
      return this.hc.get<IProduct[]>(`${this.apiUrl}/products?categoryId=${catId}`)
    }
  }

  getProductById(id:number):Observable<IProduct>
  {
    return this.hc.get<IProduct>(`${this.apiUrl}/products/${id}`)
  }

  addProduct(prd:IProduct)
  {
    return this.hc.post(`${this.apiUrl}/products` , JSON.stringify(prd) , this.httpOptions)
        // .pipe(
        //   retry(2),
        //   catchError(this.handleError())
        // )
  }

  updateProduct(id:number , prd:IProduct)
  {

  }

  deleteProduct(id:number)
  {

  }

}
