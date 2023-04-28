import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BeneficiarioService } from 'src/app/service/beneficiario.service';
import { EmpresaService } from 'src/app/service/empresa.service';
import { LoginService } from 'src/app/service/login.service';
import { CategoriaValue } from 'src/app/shared/categoria.module';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  form: FormGroup;  
  tipoUsuario: string | undefined;
  categoria: string | undefined;
  dropdownValues = CategoriaValue.values;
  pulsado = false ;
  
  constructor(private fb: FormBuilder, 
    private _empresaService: EmpresaService, 
    private _beneficiarioService: BeneficiarioService,
    private router: Router,
    private _loginService: LoginService) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      contrasenya: ['', [Validators.required,Validators.pattern(/^.{8,16}$/)]],
      nombre: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]],
      direccion: ['', [Validators.required]],
      web: ['', [Validators.required, Validators.pattern('^(http(s)?:\/\/)?([w]{3}\.)?[a-zA-Z0-9]+\.[a-zA-Z]+(\/[a-zA-Z0-9#]+\/?)*$')]],
      tipoUsuario: ['', Validators.required],
      categoria: ['', Validators.required]
    })
   }

  ngOnInit(): void {
  }

  onTipoUsuarioChange(event: any) {
    this.tipoUsuario = event.target.id;
  }

  onDropdownChange(selectedValue: any) {
   this.categoria = this.dropdownValues.find(value => value.id+"" === selectedValue.target.value)?.name;    
  }

  prueba(){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    this._empresaService.getEmpresa(1, {headers}).subscribe(data=>{
      console.log(data)
    })
  }

  registro(){
    this.pulsado = true;
    const user: any= {
      Email: this.form.get('email')?.value,
      Contrasenya: this.form.get('contrasenya')?.value,
      Nombre: this.form.get('nombre')?.value,
      Telefono: this.form.get('telefono')?.value,
      Direccion: this.form.get('direccion')?.value,
      Web: this.form.get('web')?.value,
      Categoria: this.categoria,
      Contacto: this.form.get('telefono')?.value,
      Descripcion: "",    
    }

    if(this.tipoUsuario === "empresa"){
      this._empresaService.registro(user).subscribe(data=>{
        console.log(data)
         this._loginService.iniciarSesion({Email: data.email, Contrasenya: data.contrasenya, userType: 1}).subscribe(data=>{
          console.log(data)
          localStorage.setItem('token', data.token);
          this.router.navigateByUrl('/principal');
        });
       
      },
      (error) => {
        console.log(error)                     
      });
    }
    else{
      this._beneficiarioService.registro(user).subscribe(data=>{
        this._loginService.iniciarSesion({Email: data.email, Contrasenya: data.contrasenya, userType: 0}).subscribe(data=>{
          localStorage.setItem('token', data.token);
          this.router.navigateByUrl('/principal');
        });
      },
      (error) => {
        console.log(error)                     
      });
    }
     
    }
}
