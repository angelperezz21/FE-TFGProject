import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BeneficiarioService } from 'src/app/service/beneficiario.service';
import { EmpresaService } from 'src/app/service/empresa.service';
import { CategoriaValue } from 'src/app/shared/categoria.module';

@Component({
  selector: 'app-ver-perfil',
  templateUrl: './ver-perfil.component.html',
  styleUrls: ['./ver-perfil.component.css']
})
export class VerPerfilComponent implements OnInit {
  id!: number;
  tokenId!: any;
  role!: string;
  helper = new JwtHelperService();
  usuario: any;
  dropdownValues = CategoriaValue.values;
  categoriaUser: string | undefined;
  form: any;
  formEnabled!: boolean;
  info!:string;
  

  constructor(private fb: FormBuilder,
    private _empresaService: EmpresaService,
    private _beneficiarioService: BeneficiarioService,
    private aRoute: ActivatedRoute) {
    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      contrasenya: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]],
      ubi: ['', [Validators.required]],
      web: ['', [Validators.required, Validators.pattern('^(http(s)?:\/\/)?([w]{3}\.)?[a-zA-Z0-9]+\.[a-zA-Z]+(\/[a-zA-Z0-9#]+\/?)*$')]],
      descripcion: ['', ],
      categoria: ['', Validators.required]
    })

  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    this.form.disable();
    if(token!==null){
      this.tokenId =  this.helper.decodeToken(token);
      this.id = this.tokenId.unique_name;
      this.role = this.tokenId.role;
    }

    this.info="objeto";
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  
    if(this.role === 'Empresa'){
      if(this.id!=null){this._empresaService.getEmpresa(this.id,{headers}).subscribe(data=>{
        this.usuario = data;
        this.asignarValores()
        if(this.usuario.notificacion!==0){
          this.usuario.notificacion = 0;
          this._empresaService.updateEmpresa(this.id,this.usuario,{headers}).subscribe(data=>{
          }) 
          this._empresaService.disparadorNotificaciones.emit(0)
        }
        
      })}
    }else{
      if(this.id!=null){this._beneficiarioService.getBeneficiario(this.id,{headers}).subscribe(data=>{
        this.usuario = data;
        this.asignarValores()
        if(this.usuario.notificacion!==0){
          this.usuario.notificacion = 0;
          this._beneficiarioService.updateBeneficiario(this.id,this.usuario,{headers}).subscribe(data=>{
          }) 
          this._beneficiarioService.disparadorNotificaciones.emit(0)
        }
        
      })}
    }
    
  }

  asignarValores(){
    this.categoriaUser=this.usuario.categoria;
    this.form.setValue({
      email: this.usuario.email,
      contrasenya: this.usuario.contrasenya,
      nombre: this.usuario.nombre,
      telefono: this.usuario.telefono,
      ubi: this.usuario.direccion,
      web: this.usuario.web,
      categoria: new FormControl(this.categoriaUser),
      descripcion: this.usuario.descripcion
      
    });
    
  }

  enableForm(){
    this.formEnabled = !this.formEnabled;
    if (this.formEnabled) {
      this.form.enable();
    } else {
      this.form.disable();
      this.categoriaUser=this.usuario.categoria;
      this.form.setValue({
        email: this.usuario.email,
        contrasenya: this.usuario.contrasenya,
        nombre: this.usuario.nombre,
        telefono: this.usuario.telefono,
        ubi: this.usuario.direccion,
        web: this.usuario.web,
        categoria: new FormControl(this.categoriaUser),
        descripcion: this.usuario.descripcion
      });
    }
  }

  onDropdownChange(selectedValue: any) {
    this.categoriaUser = selectedValue.target.value;  
    
   }

  onTipoInfo(selectedValue: any){
    this.info = selectedValue.target.value;  
    console.log(this.info)
  }
 
  usuarioModificado(){
    console.log(this.categoriaUser)
    this.usuario = {
      Id: this.usuario.id,
      Email: this.form.get('email')?.value,
      Contrasenya: this.form.get('contrasenya')?.value,
      Nombre: this.form.get('nombre')?.value,
      Telefono: this.form.get('telefono')?.value,
      Direccion: this.form.get('ubi')?.value,
      Web: this.form.get('web')?.value,
      Categoria: this.categoriaUser,
      Contacto: this.form.get('email')?.value,
      Descripcion: this.form.get('descripcion')?.value,    
      imgUrl:""
    }

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });  
    console.log(token)  
    if(this.role === 'Empresa'){
      if(this.id!=null){this._empresaService.updateEmpresa(this.id, this.usuario,{headers}).subscribe(data=>{
        window.location.reload()
      })}
    }else{
      if(this.id!=null){this._beneficiarioService.updateBeneficiario(this.id,this.usuario,{headers}).subscribe(data=>{
        console.log(data)
        window.location.reload()        
      })}
    }
  }

}
