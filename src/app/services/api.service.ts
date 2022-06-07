import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
const base_url ="http://localhost:3000/posts/";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }


  createClient(data:any){
    return this.http.post<any>('http://localhost:3000/posts', data)
    .pipe(map((res:any)=>{
      return res;
    }))

  }

  getClient(){
  return this.http.get<any>('http://localhost:3000/posts')
  .pipe(map((res: any)=>{
    return res;
  }))
}

updateClient(data:any, id: number){
return this.http.put<any>('http://localhost:3000/posts/' +id, data)
.pipe(map((res:any)=>{
  return res;
}))
}

deleteClient(id:number){
  return this.http.delete<any>('http://localhost:3000/posts/' +id )
  .pipe(map((res:any)=>{
    return res;
  }))
}

}