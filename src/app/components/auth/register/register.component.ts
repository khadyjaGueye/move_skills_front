import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  inscriptionForm: FormGroup;

  constructor(private fb:FormBuilder){
     // Initialiser le formulaire avec des validators pour chaque champ
     this.inscriptionForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      address: ['', Validators.required]
    });
  }

  ngOnInit(): void {

  }

 // Fonction pour soumettre le formulaire
  onSubmit() {
    if (this.inscriptionForm.valid) {
      console.log('Formulaire valide, soumission des données...', this.inscriptionForm.value);
      // Implémentez ici la logique d'inscription, par exemple, en envoyant les données à un serveur
    } else {
      console.log('Formulaire invalide, veuillez vérifier les erreurs.');
    }
  }

  // Fonction pour vérifier si les deux mots de passe sont identiques
  checkPasswords(): boolean {
    return this.inscriptionForm.get('password')?.value === this.inscriptionForm.get('confirmPassword')?.value;
  }

}
