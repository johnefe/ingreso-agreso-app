import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!:FormGroup;
  data:any;
  token:any;

  constructor( private fb:FormBuilder, private authService: AuthService, private router:Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email:[null, [Validators.required, Validators.email]],
      password:[null, Validators.required]
    });
  }

  loginUsuario(){

    if(this.loginForm.invalid){
      return;
    }

    Swal.fire({
      title: 'Espere por favor!',
      didOpen: () => {
        Swal.showLoading()
      }});

    this.authService.loginUsuario(this.loginForm.value).subscribe(res => {
      this.data = res;
      if(this.data.status === '1'){
        this.token = this.data.data.token;
        localStorage.setItem('token',this.token);
        Swal.close();
        this.router.navigate(['/']);

        this.loginForm.reset();
      } else {
        Swal.fire({
            icon:'error',
            title:'Oopss!',
            text: this.data.message+', Error: '+this.data.code
        });
      }

    });

  }

}
