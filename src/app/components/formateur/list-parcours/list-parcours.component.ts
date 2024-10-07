import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Skill, FormDataT, VideoFile } from '../../../interfaces/model';
import { FormateurService } from '../../../services/formateurs/formateur.service';


@Component({
  selector: 'app-list-parcours',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './list-parcours.component.html',
  styleUrl: './list-parcours.component.css'
})
export class ListParcoursComponent implements OnInit {

  selectedSkills: Skill[] = [];// Liste des compétences sélectionnées
  selectedButton: string = '';
  openModal: boolean = false; // Contrôle de la première modal
  showSecondModal: boolean = false; // Contrôle de la deuxième modal
  currentStep: number = 1; // Étape courante du formulaire
  fileType: string | null = null; // Contient le type de fichier sélectionné
  selectedFiles: { url: string; name: string; type: string }[] = []; // Contient les fichiers sélectionnés
  savedData: any = {}; // Objet pour stocker les données à chaque étape

  tab: number = 0;
  // Liste des compétences disponibles
  skills: Skill[] = [
    { id: 1, name: 'Développement Web' },
    { id: 2, name: 'Analyse de données' },
    { id: 3, name: 'Design UX/UI' },
    { id: 4, name: 'Management' },
    { id: 5, name: 'Gestion de projet' },
    { id: 6, name: 'Leadership' },
  ];
  formData: FormDataT = {
    info: {
      nom: '',
      objectif: '',
      type: '',
      audience: '',
      duree: '',
      competences: [], // Modifié pour stocker les compétences sélectionnées
    },
    content: {
      video: [],
      document: [],
    },
    summary: {
      confirmation: false
    }
  };
  selectedVideos: File[] = []; // Tableau pour stocker les vidéos
  selectedDocuments: File[] = []; // Tableau pour stocker l
  constructor(private service: FormateurService) { }

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
  // Méthode pour fermer toutes les modals
  closeModals() {
    this.currentStep = 1; // Fermer toutes les modals
    this.selectedFiles = []; // Réinitialiser les fichiers sélectionnés
  }

  removeSkillTab(index: number) {
    this.selectedSkills.splice(index, 1);
  }

  // Ferme le modal et réinitialise
  // closeModals() {
  //   this.selectedFile = null;
  //   this.fileType = null;
  // }
  nextStep() {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  // Méthode pour revenir à l'étape précédente
  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  onButtonClick(buttonValue: string) {
    this.selectedButton = buttonValue;
  }

  // Fonction appelée lorsque l'utilisateur sélectionne des fichiers
  onFilesSelected(event: Event, type: string) {
    const fileInput = event.target as HTMLInputElement;
    const files = fileInput.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = () => {
          this.selectedFiles.push({ url: reader.result as string, name: file.name, type: file.type }); // Ajout du fichier à la liste
        };
        reader.readAsDataURL(file); // Lecture du fichier comme URL
      }
    }
  }

  // Méthode pour stocker les données par étape
  store() {
    if (this.currentStep === 1) {
      // Stocker les données de la première étape (Info)
      this.savedData = {
        ...this.savedData,
        info: {
          nom: this.formData.info.nom,
          type: this.formData.info.type,
          audience: this.formData.info.audience,
          duree: this.formData.info.duree,
          objectif: this.formData.info.objectif,
          competences: this.selectedSkills.map(skill => skill.id)
        }
      };
      console.log('Données Info enregistrées :', this.savedData.info);
      this.nextStep();

    } else if (this.currentStep === 2) {
      // Stocker les données de la deuxième étape (Contenu)
      this.savedData = {
        ...this.savedData,
        content: {
          // Stocker les données de la deuxième étape (Vidéos/Documents)
          videos : this.selectedVideos.map(video => video), // Récupérer les vidéos sélectionnées
          documents : this.selectedDocuments.map(document => document) // Récupérer les documents sélectionnés
        }
      };
      console.log('Données Contenu enregistrées :', this.savedData.content);
      this.nextStep();

    } else if (this.currentStep === 3) {
      // Stocker les données de la troisième étape (Résumé)
      this.savedData = {
        ...this.savedData,
        summary: {
          // Résumé de la troisième étape, par exemple :
          resumeFinal: this.formData.summary.confirmation
        }
      };
      console.log('Données Résumé enregistrées :', this.savedData.summary);

      // Une fois toutes les étapes terminées, envoyer les données au backend
      this.submitForm();
    }
  }

  addVideo(video: VideoFile) {
    // Vérifie si la vidéo n'est pas déjà sélectionnée
    if (!this.selectedVideos.includes(video)) {
      this.selectedVideos.push(video);
    }
    console.log('Vidéos sélectionnées :', this.selectedVideos);
  }
  addDocument(document: VideoFile) {
    // Ajoute le document à la sélection si il n'est pas déjà sélectionné
    if (!this.selectedDocuments.includes(document)) {
      this.selectedDocuments.push(document);
    }
    console.log('Documents sélectionnés :', this.selectedDocuments);
  }


  submitForm() {
    // Appel au service pour envoyer toutes les données
    this.service.store(this.savedData).subscribe(response => {
      console.log('Parcours créé avec succès', response);
    }, error => {
      console.error('Erreur lors de la création du parcours', error);
    });
  }
  toggleSkill(skill: string) {
    const index = this.formData.info.competences.indexOf(skill);
    if (index > -1) {
      // Si la compétence est déjà sélectionnée, la retirer
      this.formData.info.competences.splice(index, 1);
    } else {
      // Sinon, ajouter la compétence
      this.formData.info.competences.push(skill);
    }
  }
}
