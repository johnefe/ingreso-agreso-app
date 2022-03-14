import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registroForm!: FormGroup;
  data:any;
  token:any;

  constructor(private fb: FormBuilder, private authservice:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.registroForm  = this.fb.group({
      firstName:[null, Validators.required],
      email:['',[Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirm_password:['',[Validators.required]]
    });
  }

  get f(){
    return this.registroForm.controls;
  }

  crearUsuario(){

    if(this.registroForm.invalid){
      return;
    }

    Swal.fire({
      title: 'Espere por favor!',
      didOpen: () => {
        Swal.showLoading()
      }});

    this.authservice.crearUsuario(this.registroForm.value).subscribe(res => {
      this.data = res;
      if(this.data.status === '1'){
        this.token = this.data.data.token;
        localStorage.setItem('token',this.token);
        Swal.close();
        this.router.navigate(['/']);
        this.registroForm.reset();
      } else {
        Swal.fire({
          icon:'error',
          title:'Oopss!',
          text: this.data.message+', Error: '+this.data.code
      });
      }
    }, err => {
      let error = 'Error in Login';
      Swal.fire(error);
    });
  }

}
