import { HttpHeaders } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BeneficiarioService } from 'src/app/service/beneficiario.service';
import { NecesitaService } from 'src/app/service/necesita.service';

@Component({
  selector: 'app-ver-beneficiario',
  templateUrl: './ver-beneficiario.component.html',
  styleUrls: ['./ver-beneficiario.component.css']
})
export class VerBeneficiarioComponent implements OnInit{
  id!: number;
  beneficiario: any;
  necesidades: any;
  tokenId: any;
  helper = new JwtHelperService();
  role: any;
  logged = false;
  idVisitante: any;
  necesidadesSolicitados: any;

  
  constructor(private _beneficiarioService: BeneficiarioService,
    private  _necesitaService: NecesitaService,
    private aRoute: ActivatedRoute) {
    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this._beneficiarioService.getPerfilBeneficiario(this.id).subscribe(data=>{
      this.beneficiario = data;      
    })

    this._necesitaService.getMyListNecesidades(this.id).subscribe(data=>{
      data.forEach((element: any) => {
        if(element.estado===1){
          if (this.necesidades === undefined) {
            this.necesidades = []; // Inicializa la variable si es undefined
          }
          this.necesidades.push(element)
        }
      });

      this.necesidades.sort((a:any, b:any) => {
        return new Date(b.fechaCreacionNecesita).getTime() - new Date(a.fechaCreacionNecesita).getTime();
      });
    })

    const token = localStorage.getItem('token');
    if(token!==null){
      if(token!==""){  
        this.tokenId =  this.helper.decodeToken(token);
        this.idVisitante = this.tokenId.unique_name;
        this.role = this.tokenId.role;
        this.misNecesidadesSolicitadas();
      }
    }
    this.logged = token !== "";
  }

  ngDoCheck(){
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

  necesidadSolicitado(necesidad: any): boolean {        
    return this.necesidadesSolicitados.some((x: any) => x.id === necesidad.id);    
  }

  solicitarNecesidad(idNecesidad: number){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    this._necesitaService.solicitarNecesidad(idNecesidad,this.idVisitante,{headers}).subscribe(data=>{
      this.misNecesidadesSolicitadas();
    });
  }

  tiempo(fecha: Date): string{
    var diferenciaMs = new Date().getTime() - new Date(fecha).getTime();
    var diferencia = Math.floor(diferenciaMs / (1000 * 60)) + " minutos" ;
    const minutos = Math.floor(diferenciaMs / (1000 * 60));
    if(minutos>60) {      
      const horas = Math.floor(minutos / 60);
      diferencia = horas + " horas";
      if(horas>24){
        diferencia = Math.floor(horas / 24) + " días";
      }
    }
    return diferencia;
  }


  misNecesidadesSolicitadas(){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    this._necesitaService.getMySolicitudesNecesitas(this.idVisitante,{headers}).subscribe(data=>{      
      this.necesidadesSolicitados = data;
      //this.misRecursosSolicitados();
    })
  }

}
