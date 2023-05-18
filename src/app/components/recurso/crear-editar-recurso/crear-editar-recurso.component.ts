import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { EmpresaService } from 'src/app/service/empresa.service';
import { RecursoService } from 'src/app/service/recurso.service';
import { MetodoValue } from 'src/app/shared/metodo.module';

@Component({
  selector: 'app-crear-editar-recurso',
  templateUrl: './crear-editar-recurso.component.html',
  styleUrls: ['./crear-editar-recurso.component.css']
})
export class CrearEditarRecursoComponent implements OnInit{
  id!: number;
  tokenId!: any;
  role!: string;
  helper = new JwtHelperService();
  form: any;
  metodoE: string | undefined;
  dropdownValues = MetodoValue.values;
  file: any;
  path: any;
  recursoModificado!: any;
  recursoNumber!:number;
  aparecer = false;
  cambiado = false;
  
  constructor(private fb: FormBuilder,
    private _recursoService: RecursoService,    
    private aRoute: ActivatedRoute,
    private toastr: ToastrService){
    this.form = this.fb.group({
      recurso: ['', [Validators.required]],
      cantidad: ['', [Validators.required]],
      precio: ['', [Validators.required]],
      metodo: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],  
      foto: ['', []],      
    })
    this.recursoNumber = Number(this.aRoute.snapshot.paramMap.get('id'))

  }
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if(token!==null){
      this.tokenId =  this.helper.decodeToken(token);
      this.id = this.tokenId.unique_name;
      this.role = this.tokenId.role;
    }

    if(this.recursoNumber!==0){      
      const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
      this._recursoService.getRecurso(this.recursoNumber, {headers} ).subscribe(data=> {
        this.recursoModificado = data;        
        this.metodoE=this.recursoModificado.metodoEntrega;
        this.aparecer=true;
        this.path = this.recursoModificado.imgUrl;
        this.form.setValue({
          recurso: this.recursoModificado.nombre,
          cantidad: this.recursoModificado.cantidad,        
          metodo: new FormControl(this.metodoE),
          precio: this.recursoModificado.precio,
          descripcion: this.recursoModificado.descripcion,
          foto: this.recursoModificado.imgUrl
        });
      });

    }
  }

  dropdownMetodo(selectedValue: any) {
    this.metodoE = selectedValue.target.value;  
    this.aparecer=false;  
    this.cambiado = true;  
    console.log(this.cambiado) 
   }



  onFileSelected(selectedValue: any){
    this.file = selectedValue.target.files[0]; 
    console.log(this.file)// Obtiene el archivo seleccionado por el usuario
    const formData = new FormData();
    formData.append('image', this.file,this.file.name);
    
    this._recursoService.uploadPhoto(formData).subscribe(data=>{
      this.path = data.imagePath;
    })
         
  }


  publicar(){
    
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    console.log(this.path)
    const recurso = {
      Estado: 1,
      Nombre: this.form.get('recurso')?.value,
      Precio: this.form.get('precio')?.value,
      Cantidad: this.form.get('cantidad')?.value,
      MetodoEntrega: this.metodoE,
      IdEmpresa: this.id,      
      imgUrl: this.path,
      Descripcion: this.form.get('descripcion')?.value, 
    }
    this._recursoService.postRecurso(recurso, {headers} ).subscribe(data=> {
      this.toastr.info("Recurso publicado con éxito")
      this.form.reset()
    },error=>{
      console.log(error)
      this.toastr.error(error.error.title); 
    } );
  }


  guardar(){
    const recurso = {
      Id: this.recursoNumber,
      Estado: 1,
      Nombre: this.form.get('recurso')?.value,
      Precio: this.form.get('precio')?.value,
      Cantidad: this.form.get('cantidad')?.value,
      MetodoEntrega: this.metodoE,
      IdEmpresa: this.id,      
      imgUrl: this.path,
      Descripcion: this.form.get('descripcion')?.value, 
    }

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    this._recursoService.updateRecurso(this.recursoNumber,recurso, {headers} ).subscribe(data=> {
      this.toastr.success("Recurso modificado con éxito");      
    } );
  }



  eliminar(idRecurso: number){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
      const result = window.confirm('¿Estás seguro de que deseas eliminar el recurso?');
      if (result) {
        this._recursoService.deleteRecurso(idRecurso, {headers} ).subscribe(data=> {
          this.toastr.info("Recurso eliminado con éxito");
          window.location.href='/MiPerfil/' +this.id;
        } );
      }
  }
  
}
