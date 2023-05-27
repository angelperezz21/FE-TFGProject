import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BeneficiarioService } from 'src/app/service/beneficiario.service';
import { EmpresaService } from 'src/app/service/empresa.service';
import { LoginService } from 'src/app/service/login.service';
import { CategoriaValue } from 'src/app/shared/categoria.module';
import { CategoriaONGValue } from 'src/app/shared/categoriaONG.module';


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
  file: any;
  path: any;
  loading = false;
  aceptado=false;
  
  constructor(private fb: FormBuilder, 
    private _empresaService: EmpresaService, 
    private _beneficiarioService: BeneficiarioService,
    private router: Router,
    private _loginService: LoginService,
    private toastr: ToastrService) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      contrasenya: ['', [Validators.required,Validators.pattern(/^.{8,16}$/)]],
      nombre: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]],
      direccion: ['', [Validators.required]],
      web: ['', [Validators.required]],
      tipoUsuario: ['', Validators.required],
      categoria: ['', Validators.required],
      cif: ['',[Validators.required, Validators.pattern(/^[A-Za-z][0-9]{7}[A-Za-z0-9]$/)]],
      descripcion: ['', Validators.required],
      foto: ['']
    })
   }

  ngOnInit(): void {
  }

  onTipoUsuarioChange(event: any) {
    this.tipoUsuario = event.target.id;
    if(this.tipoUsuario==="empresa"){
      this.dropdownValues = CategoriaValue.values;
    }else{
      this.dropdownValues = CategoriaONGValue.values;
    }
  }
  
  onDropdownChange(selectedValue: any) {
   this.categoria = this.dropdownValues.find(value => value.id+"" === selectedValue.target.value)?.name;    
  }

  registro(){
    if(this.form.valid){
      this.loading = true;
    }  
    this.pulsado = true;
    const user: any= {
      Email: this.form.get('email')?.value,
      Contrasenya: this.form.get('contrasenya')?.value,
      Nombre: this.form.get('nombre')?.value,
      Telefono: this.form.get('telefono')?.value,
      Direccion: this.form.get('direccion')?.value,
      Web: this.form.get('web')?.value,
      Categoria: this.categoria,
      Contacto: this.form.get('email')?.value,
      Descripcion: this.form.get('descripcion')?.value,    
      imgUrl:this.path,
      PasswordSinHash: this.form.get('contrasenya')?.value,
      CIF: this.form.get('cif')?.value
    }
    
    if(this.tipoUsuario === "empresa"){

      this._empresaService.registro(user).subscribe(data=>{
        console.log(data)
        this.loading=false;      
        this.toastr.success("Registro con éxito");
         this._loginService.iniciarSesion({Email: data.email, Contrasenya: data.contrasenya, userType: 1}).subscribe(data=>{
          localStorage.setItem('token', data.token);
          this.router.navigateByUrl('/principal');
        });
       
      },
      (error) => {         
        this.loading=false;      
        console.log(error)        
        this.toastr.error(error.error);
      });
    }
    else if(this.tipoUsuario === "beneficiario"){
      this._beneficiarioService.registro(user).subscribe(data=>{
        this.loading=false;      
        this._loginService.iniciarSesion({Email: data.email, Contrasenya: data.contrasenya, userType: 0}).subscribe(data=>{
          localStorage.setItem('token', data.token);
          this.router.navigateByUrl('/principal');
        });
      },
      (error) => {
        this.loading=false;      
        console.log(error)        
        this.toastr.error(error.error);                  
      });
    }     
    }


    onMetodoChange() {     
      this.aceptado=!this.aceptado;
      console.log(this.aceptado)
    }

    onFileSelected(selectedValue: any){
      this.file = selectedValue.target.files[0]; 
      console.log(this.file)// Obtiene el archivo seleccionado por el usuario
      const formData = new FormData();
      formData.append('image', this.file,this.file.name);
      console.log(formData)
      if(this.tipoUsuario === "empresa"){
        this._empresaService.uploadPhoto(formData).subscribe(data=>{    
          this.path = data.imagePath;      
        })    
      }else if(this.tipoUsuario === "beneficiario"){
        this._beneficiarioService.uploadPhoto(formData).subscribe(data=>{    
          this.path = data.imagePath;      
        })    
      }    
    }
}
