import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NecesitaService } from 'src/app/service/necesita.service';
import { MetodoValue } from 'src/app/shared/metodo.module';

@Component({
  selector: 'app-crear-editar-necesita',
  templateUrl: './crear-editar-necesita.component.html',
  styleUrls: ['./crear-editar-necesita.component.css']
})
export class CrearEditarNecesitaComponent implements OnInit{
  id!: number;
  tokenId!: any;
  role!: string;
  helper = new JwtHelperService();
  form: any;
  metodo: string | undefined;
  dropdownValues = MetodoValue.values;
  certificado: any;
  file: any;
  path: any;
  
  constructor(private fb: FormBuilder,
    private _necesitaService: NecesitaService,    
    private aRoute: ActivatedRoute) {
    this.form = this.fb.group({
      necesita: ['', [Validators.required]],
      cantidad: ['', [Validators.required]],
      precio: ['', [Validators.required]],    
      descripcion: ['', []],      
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

   onCertificado(event: any) {
    this.certificado = event.target.id;    
  }

  onFileSelected(selectedValue: any){
    this.file = selectedValue.target.files[0]; 
    
    const formData = new FormData();
    formData.append('image', this.file,this.file.name);    

    this._necesitaService.uploadPhoto(formData).subscribe(data=>{
      this.path = data.imagePath;
    })
      
  }

  publicar(){
    
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  
    const necesidad = {
      Estado: 1,
      Nombre: this.form.get('necesita')?.value,
      Precio: this.form.get('precio')?.value,
      Cantidad: this.form.get('cantidad')?.value,      
      Descripcion: this.form.get('descripcion')?.value,    
      IdBeneficiario: this.id,
      Certificado: this.certificado==='true' ? true : false,
      imgUrl: this.path
    }    
    this._necesitaService.postNecesita(necesidad, {headers} ).subscribe(data=> {
      console.log(data);
      console.log("hola");
      this.form.reset()}
    );
  }
  
}
