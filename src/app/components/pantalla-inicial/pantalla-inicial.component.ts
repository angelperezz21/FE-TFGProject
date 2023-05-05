import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DonacionService } from 'src/app/service/donacion.service';

@Component({
  selector: 'app-pantalla-inicial',
  templateUrl: './pantalla-inicial.component.html',
  styleUrls: ['./pantalla-inicial.component.css']
})
export class PantallaInicialComponent  {
  /**
   *
   */
  /**
   *
   */
  constructor(private _donacion: DonacionService) {
    
    
  }

  haz(){
    const token = localStorage.getItem('token');             
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });  
    
   // const options = { headers: header, responseType: 'blob' };
    this._donacion.getCertificado(6,{headers}).subscribe((bytes: ArrayBuffer)=>{
      console.log(bytes)
      const blob = new Blob([bytes], { type: 'application/pdf' });
      console.log(blob)
      // Crear una URL temporal para el archivo
      const url = window.URL.createObjectURL(blob);

      // Crear un enlace para descargar el archivo y establecer su atributo 'href' a la URL temporal
      const link = document.createElement('a');
      link.href = url;

      // Establecer el nombre de archivo que se descargará en el atributo 'download'
      link.download = 'CertificadoDonacion.pdf';

      // Agregar el enlace al documento y hacer clic en él para descargar el archivo
      document.body.appendChild(link);
      link.click();

      // Liberar la URL temporal creada para el archivo
      window.URL.revokeObjectURL(url);
      
    })
  }
}
