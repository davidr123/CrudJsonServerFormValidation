import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteModel } from '../model/cliente-dasboard.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-cliente-dashboard',
  templateUrl: './cliente-dashboard.component.html',
  styleUrls: ['./cliente-dashboard.component.css']
})
export class ClienteDashboardComponent implements OnInit {

 clienteModelObj: ClienteModel = new ClienteModel();

  formValue!: FormGroup;
 public clientData!:any;
shoadd!:boolean;
showupdate!:boolean;
 clienteselccionado!:ClienteModel;
 public submited:boolean= false;

  constructor(private fb:FormBuilder, private clienteService: ApiService) { }

  ngOnInit(): void {
    this.formValue=this.fb.group({
      // id:[''],
      cedula:['', [Validators.required ,Validators.pattern(/^([0-9]){10}$/), Validators.maxLength(10)]],
      nombre:[''],
      apellido:[''],
      direccion:[''],
      telefono:['']

    });

    this.getCLiente();

   


  }

  get formu(){
    return this.formValue.controls;
      
  }

  CamposInvalidos():boolean{
    if(this.formValue.invalid && this.submited){
      return true;
    }else{
      return false;
    }
  }

  createCliente(){
  // this.clienteModelObj.cedula= this.formValue.value.cedula;
  // this.clienteModelObj.nombre= this.formValue.value.nombre;
  // this.clienteModelObj.apellido= this.formValue.value.apellido;
  // this.clienteModelObj.direccion= this.formValue.value.direccion;
  // this.clienteModelObj.telefono= this.formValue.value.telefono;


  if(!this.formValue.invalid){
    this.clienteService.createClient(this.formValue.value)
    .subscribe(resp=>{
      console.log(resp)
      this.submited=true;

      alert('Cliente creado exitosamente');
      this.formValue.reset();
      this.getCLiente();
  
      let cancel = document.getElementById('cancel');
      cancel?.click();
    }, err=>{
      alert('Hable con el administrador')
    });
  }else{
    alert('Debe llenar todo el formulario correctamente');
  }



  }

  clickAddCliente(){
    this.formValue.reset();
    this.shoadd=true;
    this.showupdate=false;

  }


  getCLiente(){
    this.clienteService.getClient()
    .subscribe(resp=>{
this.clientData= resp;

    })
  }


  deleteCliente(client:any){
    console.log(this.clienteModelObj);
    this.clienteService.deleteClient(client.id)
   
    .subscribe(resp=>{
      console.log(resp);
      alert('Cliente Eliminado')
      this.getCLiente();
    })
  }

  editClient(client:any){
    console.log(client);
    this.shoadd=false;
    this.showupdate=true;
     this.clienteModelObj.id= client.id;
  this.formValue.controls['cedula'].setValue(client.cedula);
  this.formValue.controls['nombre'].setValue(client.nombre);
  this.formValue.controls['apellido'].setValue(client.apellido);
  this.formValue.controls['direccion'].setValue(client.direccion);
  this.formValue.controls['telefono'].setValue(client.telefono);

    
    // const {cedula, nombre, apellido, direccion, telefono}= client;

    // this.formValue.setValue({cedula, nombre, apellido, direccion, telefono})

  
  }

  UpdateCliente(){
    this.clienteModelObj.id= this.formValue.value.id;
      this.clienteModelObj.cedula= this.formValue.value.cedula;
  this.clienteModelObj.nombre= this.formValue.value.nombre;
  this.clienteModelObj.apellido= this.formValue.value.apellido;
  this.clienteModelObj.direccion= this.formValue.value.direccion;
  this.clienteModelObj.telefono= this.formValue.value.telefono;
// console.log(this.clienteselccionado.id);
    this.clienteService.updateClient(this.clienteModelObj, 4)
    .subscribe(resp=>{
      console.log(resp);
      alert('Cliente Actualizado');
      let cancel = document.getElementById('cancel');
      cancel?.click();
      this.formValue.reset();
      this.getCLiente();
  
     
    })
  }

}
