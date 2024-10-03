import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { User } from '../../../interfaces/model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  message: string = "";
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  ngOnInit(): void {

  }
  // Fonction pour soumettre le formulaire
  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Formulaire valide, soumission des données...', this.loginForm.value);
      // Implémentez ici la logique de connexion, par exemple, en envoyant les données à un serveur
    } else {
      console.log('Formulaire invalide, veuillez vérifier les erreurs.');
    }
  }


  connecter() {
    let userLog = this.loginForm.value;
   // console.log(userLog);
    return this.authService.login(userLog).subscribe(resp => {
      if (resp.status) {
        let tocken = resp.token;
        let user = resp.user;
        this.authService.authentificateUser(user, tocken).subscribe(rep => {
          if (user.role == "apprenant") {
            this.router.navigateByUrl("/apprenant");
          } if (user.role == "superviseur") {
            this.router.navigateByUrl("/sup");
          }
        })
      } else {
        this.router.navigateByUrl("");
      }
    }, error => {
      console.error(error.error.message);
      this.message = error.error.message;
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: this.message,
        timer: 1500
      })
    })
  }
}
