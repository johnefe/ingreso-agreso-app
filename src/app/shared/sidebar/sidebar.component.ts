import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  data:any;
  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  logout(){
    Swal.fire({
      title: 'Cerrando sesión...!',
    didOpen: () => {
      Swal.showLoading()
    }});
    this.authService.logout().subscribe(res => {
      this.data = res;

      if(this.data.status === '1'){
        Swal.close();
        localStorage.removeItem('token');
        this.router.navigate(['login']);

      } else {
        Swal.fire({
            icon:'error',
            title:'Oopss!',
            text: this.data.message+', Error: '+this.data.code
        });
      }


    }, err => {
      let error = 'Error Logout';
      Swal.fire(error);
    }, () => {
      console.log('Login success');
    });
  }

}
