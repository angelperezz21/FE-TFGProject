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
  categoria: string | undefined;
  form: any;
  

  constructor(private fb: FormBuilder,
    private _empresaService: EmpresaService,
    private _beneficiarioService: BeneficiarioService,
    private aRoute: ActivatedRoute) {
    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      contrasenya: ['', [Validators.required,Validators.pattern(/^.{8,16}$/)]],
      nombre: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]],
      ubi: ['', [Validators.required]],
      web: ['', [Validators.required, Validators.pattern('^(http(s)?:\/\/)?([w]{3}\.)?[a-zA-Z0-9]+\.[a-zA-Z]+(\/[a-zA-Z0-9#]+\/?)*$')]],      
      categoria: ['', Validators.required],
      descripcion: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if(token!==null){
      this.tokenId =  this.helper.decodeToken(token);
      this.id = this.tokenId.unique_name;
      this.role = this.tokenId.role;
    }

    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    console.log(this.role)
    if(this.role === 'Empresa'){
      if(this.id!=null){this._empresaService.getEmpresa(this.id,{headers}).subscribe(data=>{
        this.usuario = data;
        console.log(data)
        this.asignarValores()
      })}
    }else{
      if(this.id!=null){this._beneficiarioService.getBeneficiario(this.id,{headers}).subscribe(data=>{
        this.usuario = data;
        this.asignarValores()
      })}
    }
    
  }

  asignarValores(){
    this.form.setValue({
      email: this.usuario.email,
      contrasenya: this.usuario.contrasenya,
      nombre: this.usuario.nombre,
      telefono: this.usuario.telefono,
      ubi: this.usuario.direccion,
      web: this.usuario.web,      
      categoria: new FormControl(this.usuario.categoria),
      descripcion: this.usuario.descripcion
      
    });
  }

  onDropdownChange(selectedValue: any) {
    this.categoria = this.dropdownValues.find(value => value.id+"" === selectedValue.target.value)?.name;    
   }
 
  usuarioModificado(){
    this.usuario = {
      Id: this.usuario.id,
      Email: this.form.get('email')?.value,
      Contrasenya: this.form.get('contrasenya')?.value,
      Nombre: this.form.get('nombre')?.value,
      Telefono: this.form.get('telefono')?.value,
      Direccion: this.form.get('ubi')?.value,
      Web: this.form.get('web')?.value,
      Categoria: this.form.get('categoria')?.value,
      Contacto: this.form.get('email')?.value,
      Descripcion: this.form.get('descripcion')?.value,    
      imgUrl:""
    }

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    console.log(this.usuario)
    if(this.role === 'Empresa'){
      if(this.id!=null){this._empresaService.updateEmpresa(this.id, this.usuario,{headers}).subscribe(data=>{
        //window.location.reload()
      })}
    }else{
      if(this.id!=null){this._beneficiarioService.updateBeneficiario(this.id,this.usuario,{headers}).subscribe(data=>{
        window.location.reload()
        
      })}
    }
  }

}
