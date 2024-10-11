import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Data, Model } from '../../../interfaces/model';
import { ApprenantService } from '../../../services/apprenants/apprenant.service';
import { tap } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  inscriptionForm: FormGroup;
  message: string = ""

  constructor(private fb: FormBuilder, private service: ApprenantService,private router: Router) {
    // Initialiser le formulaire avec des validators pour chaque champ
    this.inscriptionForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      role: ['', Validators.required]
    });
  }

  ngOnInit(): void {

  }

  // Fonction pour soumettre le formulaire
  onSubmit() {
    this.service.url = environment.apiBaseUrl + "register";
    console.log(this.inscriptionForm.value);
    const data = this.inscriptionForm.value
    this.service.store(data).pipe(tap({
      next: (resp) => {
        console.log(resp);
        //this.handleResponse(resp.data.message);
         // Redirection vers la page de connexion après le succès
         this.router.navigate(['']);
      }, complete: () => {
        console.log("Observable Termite");
      }, error: (error) => {
        console.log(error);
        //sthis.handleResponse(error);
      }
    })).subscribe();

    // if (this.inscriptionForm.valid) {
    //   console.log('Formulaire valide, soumission des données...', this.inscriptionForm.value);
    //   // Implémentez ici la logique d'inscription, par exemple, en envoyant les données à un serveur
    // } else {
    //   console.log('Formulaire invalide, veuillez vérifier les erreurs.');
    // }
  }

  //Fonction pour afficher les messages d'erreurs
  handleResponse<T>(responseOrError: T | HttpErrorResponse) {
    if (responseOrError instanceof HttpErrorResponse) {
      this.message = responseOrError.error.data.message;
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: this.message,
        timer: 1500
      });
    } else {
      const response = responseOrError as Model<Data>;
      this.message = response.data.message;
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: this.message,
        showConfirmButton: false,
        timer: 1500
      });
    }
  }



  // Fonction pour vérifier si les deux mots de passe sont identiques
  checkPasswords(): boolean {
    return this.inscriptionForm.get('password')?.value === this.inscriptionForm.get('confirmPassword')?.value;
  }



}
