import { Component } from '@angular/core';
import { JwtHelperService, JwtModule }from '@auth0/angular-jwt'

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  logged = false;
  id = null;
  helper = new JwtHelperService();
  tokenId: any;
  role!: string;

  ngDoCheck() {
    const token = localStorage.getItem('token');
    if(token!==null){
      if(token!==""){        
        this.tokenId =  this.helper.decodeToken(token);
        this.id = this.tokenId.unique_name;
        this.role = this.tokenId.role;
      }
    }
    this.logged = token !== "";
  }

  cerrarSesion(){
    localStorage.setItem('token',"")
    window.location.reload();
    window.location.href='/Inicio';
  }
}
