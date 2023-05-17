import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
  metodo: string | undefined;
  dropdownValues = MetodoValue.values;
  file: any;
  path: any;
  
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

  }
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if(token!==null){
      this.tokenId =  this.helper.decodeToken(token);
      this.id = this.tokenId.unique_name;
      this.role = this.tokenId.role;
    }
  }

  dropdownMetodo(selectedValue: any) {
    this.metodo = this.dropdownValues.find(value => value.id+"" === selectedValue.target.value)?.name;    
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
      MetodoEntrega: this.metodo,
      IdEmpresa: this.id,      
      imgUrl: this.path,
      Descripcion: this.form.get('descripcion')?.value, 
    }
    this._recursoService.postRecurso(recurso, {headers} ).subscribe(data=> {
      this.toastr.info("Recurso publicado con éxito")
      this.form.reset()
    }      
    );
  }
  
}
