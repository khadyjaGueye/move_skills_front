import { Component, OnInit } from '@angular/core';
import { Apprenant, Skill } from '../../../interfaces/model';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {

  apprenants: Apprenant[] = [];
  // Liste des compétences disponibles
  skills: Skill[] = [
    { id: 1, name: 'Développement Web' },
    { id: 2, name: 'Analyse de données' },
    { id: 3, name: 'Design UX/UI' },
    { id: 4, name: 'Management' },
    { id: 5, name: 'Gestion de projet' },
    { id: 6, name: 'Leadership' },
  ]
  // Liste des compétences sélectionnées
  selectedSkills: Skill[] = [];

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
    // this.serviceApp.url = environment.apiBaseUrl + "";

    // return this.serviceApp.all().subscribe((resp: Model<Data>) => {
    //   this.apprenants = resp.data.apprenants;

    // })
  }
}
