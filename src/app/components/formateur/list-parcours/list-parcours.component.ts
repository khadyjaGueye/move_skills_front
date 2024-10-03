import { Component, OnInit } from '@angular/core';
import { FormateurService } from '../../../services/formateurs/formateur.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../../../../environments/environment.development';
import { Skill } from '../../../interfaces/model';

@Component({
  selector: 'app-list-parcours',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './list-parcours.component.html',
  styleUrl: './list-parcours.component.css'
})
export class ListParcoursComponent implements OnInit {

  openModal: boolean = false;
  // Liste des compétences sélectionnées
  selectedSkills: Skill[] = [];
  currentStep: number = 1;
  selectedButton: string = '';
  selectedFiles: File[] = [];

  // Liste des compétences disponibles
  skills: Skill[] = [
    { id: 1, name: 'Développement Web' },
    { id: 2, name: 'Analyse de données' },
    { id: 3, name: 'Design UX/UI' },
    { id: 4, name: 'Management' },
    { id: 5, name: 'Gestion de projet' },
    { id: 6, name: 'Leadership' },
  ]

  constructor() { }

  ngOnInit(): void {

  }

  // Sélectionner une compétence
  selectSkill(skill: Skill) {
    if (!this.selectedSkills.includes(skill)) {
      this.selectedSkills.push(skill);
    }
  }

  // Retirer une compétence
  removeSkill(skill: Skill) {
    this.selectedSkills = this.selectedSkills.filter(s => s !== skill);
  }
  index() {
    //this.service.url = environment.apiBaseUrl + '';
  }
  openModalParcour() {
    this.openModal = true;
  }
  closeModal() {
    this.openModal = false;
  }

  nextStep() {
    this.currentStep++;
  }

  prevStep() {

    this.currentStep--;
  }

  onButtonClick(buttonValue: string) {
    this.selectedButton = buttonValue;
  }

  createParcour() {

  }
  selectedFile: File | null = null;

  showModal: boolean = false;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
}
