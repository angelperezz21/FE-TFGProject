import { Component } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { LoginService } from 'src/app/service/login.service';
import { Router } from '@angular/router';
import { EmpresaService } from 'src/app/service/empresa.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;
  id: number | undefined;
  loginError: string | undefined;
  tipoUsuario: string | undefined;
  isModalOpen = false;  
  passwordVisible: boolean = false;

  
  constructor(private fb: FormBuilder, 
    private _loginService: LoginService,
    private _empresaService: EmpresaService,
    private router: Router,
    private toastr: ToastrService) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      contrasenya: ['', ],
      tipoUsuario: ['', Validators.required],
      tipoBeneficiario: ['', Validators.required],
    })
   }

  ngOnInit(): void {

  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }


 
  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  onModalConfirm() {
    this.isModalOpen = false;
    if(this.tipoUsuario === "empresa"){
      this._empresaService.contrasenyaEmpresa(this.form.get('email')?.value).subscribe(data=>{
        this.toastr.success("Contraseña enviada con éxito")
      })
    }
    if(this.tipoUsuario==='beneficiario'){      
    this._empresaService.contrasenyaEmpresa(this.form.get('email')?.value).subscribe(data=>{
      this.toastr.success("Contraseña enviada con éxito")
    })
    }
    
  }

  onTipoUsuarioChange(event: any) {
    this.tipoUsuario = event.target.id;
    console.log(this.tipoUsuario)
  }

  iniciarSesion(){
    const user: any= {
      Email: this.form.get('email')?.value,
      Contrasenya: this.form.get('contrasenya')?.value,
      userType: this.tipoUsuario === "empresa" ? 1 : 0
    }
      this._loginService.iniciarSesion(user).subscribe(data=>{
        localStorage.setItem('token', data.token);        
        this.router.navigateByUrl('/Inicio');        
      },
      (error) => {
        console.log(error)
        if (error.error === "Error contraseña") 
          this.loginError = 'Contraseña incorrecta o elección de usuario incorrecto, inténtelo de nuevo';           
      });
    }


}
