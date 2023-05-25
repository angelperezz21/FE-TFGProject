import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
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
  metodoE: string | undefined;
  dropdownValues = MetodoValue.values;  
  file: any;
  path: any;
  necesidadModificada!: any;
  necesidadNumber!:number;
  aparecer = false;
  cambiado = false;


  constructor(private fb: FormBuilder,
    private _necesitaService: NecesitaService,    
    private aRoute: ActivatedRoute,
    private toastr: ToastrService) {
    this.form = this.fb.group({
      necesita: ['', [Validators.required]],
      cantidad: ['', [Validators.required]],
      precio: ['', [Validators.required]],  
      metodo: ['', [Validators.required]],  
      descripcion: ['', [Validators.required]],      
      foto: ['', []],      
    })
    this.necesidadNumber = Number(this.aRoute.snapshot.paramMap.get('id'))

  }
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if(token!==null){
      this.tokenId =  this.helper.decodeToken(token);
      this.id = this.tokenId.unique_name;
      this.role = this.tokenId.role;
    }

    if(this.necesidadNumber!==0){      
      const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
      this._necesitaService.getNecesita(this.necesidadNumber, {headers} ).subscribe(data=> {
        this.necesidadModificada = data;        
        console.log(this.necesidadModificada.precio)
        this.metodoE=this.necesidadModificada.metodoEntrega;
        this.aparecer=true;
        this.path = this.necesidadModificada.imgUrl;
        this.form.setValue({
          necesita: this.necesidadModificada.nombre,
          cantidad: this.necesidadModificada.cantidad,        
          metodo: new FormControl(this.metodoE),
          precio: this.necesidadModificada.precio,
          descripcion: this.necesidadModificada.descripcion,
          foto: this.necesidadModificada.imgUrl
        });
      });

    }else{
      this.metodoE="Avión";
    }
  }

  dropdownMetodo(selectedValue: any) {
    this.metodoE = selectedValue.target.value;  
    this.aparecer=false;  
    this.cambiado = true;      
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
      MetodoEntrega: this.metodoE, 
      IdBeneficiario: this.id,      
      imgUrl: this.path
    }    
    this._necesitaService.postNecesita(necesidad, {headers} ).subscribe(data=> {
      this.toastr.info("Necesidad publicada con éxito")
      this.form.reset()}
    );
  }

  guardar(){
    const necesidad = {
      Id: this.necesidadNumber,
      Estado: 1,
      Nombre: this.form.get('necesita')?.value,
      Precio: this.form.get('precio')?.value,
      Cantidad: this.form.get('cantidad')?.value,
      MetodoEntrega: this.metodoE,
      IdBeneficiario: this.id,      
      imgUrl: this.path,
      Descripcion: this.form.get('descripcion')?.value, 
    }

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    this._necesitaService.updateNecesita(this.necesidadNumber,necesidad, {headers} ).subscribe(data=> {
      this.toastr.success("Recurso modificado con éxito");      
    });
  }



  eliminar(idNecesidad: number){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
      const result = window.confirm('¿Estás seguro de que deseas eliminar la necesidad?');
      if (result) {
        this._necesitaService.deleteNecesita(idNecesidad, {headers} ).subscribe(data=> {
          this.toastr.info("Necesidad eliminada con éxito");
          window.location.href='/MiPerfil/' +this.id;
        } );
      }
  }
  
}
