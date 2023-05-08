import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { EmpresaService } from 'src/app/service/empresa.service';
import { RecursoService } from 'src/app/service/recurso.service';

@Component({
  selector: 'app-ver-empresa',
  templateUrl: './ver-empresa.component.html',
  styleUrls: ['./ver-empresa.component.css']
})
export class VerEmpresaComponent implements OnInit{
  id!: number;
  empresa: any;
  recursos: any;
  tokenId: any;
  helper = new JwtHelperService();  
  role: any;
  logged = false;
  idVisitante: any;
  recursosSolicitados: any;
  
  constructor(private _empresasService: EmpresaService,
    private  _recursoService: RecursoService,
    private aRoute: ActivatedRoute) {
    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this._empresasService.getPerfilEmpresa(this.id).subscribe(data=>{      
      this.empresa = data;      
    })

    this._recursoService.getMyListRecursos(this.id).subscribe(data=>{
      data.forEach((element: any) => {
        if(element.estado===1){
          if (this.recursos === undefined) {
            this.recursos = []; // Inicializa la variable si es undefined
          }
          this.recursos.push(element)
        }
      });
    })

    const token = localStorage.getItem('token');
    if(token!==null){
      if(token!==""){  
        this.tokenId =  this.helper.decodeToken(token);
        this.idVisitante = this.tokenId.unique_name;
        this.role = this.tokenId.role;
        this.misRecursosSolicitados();
      }
    }
    this.logged = token !== "";
  }

  ngDoCheck() {
    const token = localStorage.getItem('token');
    if(token!==null){
      if(token!==""){        
        this.tokenId =  this.helper.decodeToken(token);
        this.idVisitante = this.tokenId.unique_name;
        this.role = this.tokenId.role;
        
      }
    }
    this.logged = token !== "";
  }

  recursoSolicitado(recurso: any): boolean {        
    return this.recursosSolicitados.some((x: any) => x.id === recurso.id);    
  }

  solicitarRecurso(idRecurso: number){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    this._recursoService.solicitarRecurso(idRecurso,this.idVisitante,{headers}).subscribe(data=>{
      this.misRecursosSolicitados();
    });
  }

  misRecursosSolicitados(){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    this._recursoService.getMySolicitudesRecursos(this.idVisitante,{headers}).subscribe(data=>{      
      this.recursosSolicitados = data;
      //this.misRecursosSolicitados();
    })
  }

}
