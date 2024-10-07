import { Component, OnInit } from '@angular/core';
import {  ContentItem } from '../../../interfaces/model';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApprenantService } from '../../../services/apprenants/apprenant.service';
import { AppService } from '../../../services/apprenants/app.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {

  videos = [
    { name: 'Introduction à Angular', url: 'assets/videos/angular-intro.mp4' },
    { name: 'Tutoriel TypeScript', url: 'assets/videos/typescript-tutorial.mp4' },
    { name: 'Programmation en JavaScript', url: 'assets/videos/javascript.mp4' }
  ];
  documents = [
    { name: 'Cours de JavaScript', url: 'assets/documents/js-course.pdf', type: 'PDF' },
    { name: 'Tutoriel Angular', url: 'assets/documents/angular-guide.docx', type: 'Word' },
    { name: 'Référence TypeScript', url: 'assets/documents/typescript-reference.pdf', type: 'PDF' }
  ];
  externalLinks = [
    { name: 'Documentation Angular', url: 'https://angular.io/docs' },
    { name: 'Documentation TypeScript', url: 'https://www.typescriptlang.org/docs/' }
  ];

  documents1: ContentItem[] = [];
  videos1: ContentItem[] = [];

  constructor(private service: AppService) { }

  ngOnInit(): void {
// this.getVideoDocument()
  }

  getVideoDocument() {
       // Récupérer les contenus (vidéos et documents) depuis l'API
    // this.service.getContenus().subscribe(
    //   (data: ContentItem[]) => {
    //     // Séparer les vidéos et les documents en fonction de leur type
    //     this.videos1 = data.filter(item => item.type === 'video');
    //     this.documents1 = data.filter(item => item.type === 'document');
    //   },
    //   (error) => {
    //     console.error('Erreur lors de la récupération des contenus:', error);
    //   }
    // );

  }

}

