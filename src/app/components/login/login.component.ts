import { Component } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { LoginService } from 'src/app/service/login.service';
import { Router } from '@angular/router';

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
  
  constructor(private fb: FormBuilder, 
    private _loginService: LoginService,
    private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      contrasenya: ['', ],
    })
   }

  ngOnInit(): void {

  }

  onTipoUsuarioChange(event: any) {
    this.tipoUsuario = event.target.id;
  }

  iniciarSesion(){
    const user: any= {
      Email: this.form.get('email')?.value,
      Contrasenya: this.form.get('contrasenya')?.value,
      userType: this.tipoUsuario === "empresa" ? 1 : 0
    }
      this._loginService.iniciarSesion(user).subscribe(data=>{
        localStorage.setItem('token', data.token);
        this.router.navigateByUrl('/principal');
      },
      (error) => {
        console.log(error)
        if (error.error === "Error contraseña") 
          this.loginError = 'Contraseña incorrecta o elección de usuario incorrecto, inténtelo de nuevo';           
      });
    }


  editarTarjeta(tarjeta: any){
    
    this.id=tarjeta.id;

    this.form.patchValue({
      titular:tarjeta.titular,
      numeroTarjeta:tarjeta.numeroTarjeta,
      fechaCaducidad: tarjeta.fechaCaducidad,
      cvc: tarjeta.cvc
    });
  }
}
