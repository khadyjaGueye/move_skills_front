import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Skill, FormDataT, VideoFile, Parcour } from '../../../interfaces/model';
import { FormateurService } from '../../../services/formateurs/formateur.service';
import { environment } from '../../../../environments/environment.development';
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-list-parcours',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './list-parcours.component.html',
  styleUrl: './list-parcours.component.css'
})
export class ListParcoursComponent implements OnInit {

  selectedSkills: Skill[] = [];// Liste des compétences sélectionnées
  parcours: Parcour[] = [];
  selectedButton: string = '';
  openModal: boolean = false; // Contrôle de la première modal
  showSecondModal: boolean = false; // Contrôle de la deuxième modal
  currentStep: number = 1; // Étape courante du formulaire
  fileType: string | null = null; // Contient le type de fichier sélectionné
  selectedFiles: { url: any; name: string; type: string,rawFile:any }[] = []; // Contient les fichiers sélectionnés
  savedData: any = {}; // Objet pour stocker les données à chaque étape
  displayVideo: boolean = false;

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
      nom_parcour: '',
      objectif: '',
      status_type: 1,
      status_audiance: 1,
      duree: 0,
      competences: [], // Modifié pour stocker les compétences sélectionnées
      status_disponibilite: 20
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
  idParcours: number  = 1; // Variable pour stocker l'ID du parcours créé
  constructor(private service: FormateurService,private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getParcours()
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
    this.openModal = false
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
   // Sélection des fichiers
   onFilesSelected(event: any, type: string) {
    const files = event.target.files;
    console.log(files);

    for (const file of files) {
      const fileUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
      this.selectedFiles.push({
        name: file.name,
        url: fileUrl,
        type: file.type,
        rawFile: file
      });
    }
  }

  // Fonction appelée lorsque l'utilisateur sélectionne des fichiers
  // onFilesSelected(event: Event, type: string) {
  //   const fileInput = event.target as HTMLInputElement;
  //   const files = fileInput.files;
  //   if (files) {
  //     for (let i = 0; i < files.length; i++) {
  //       const file = files[i];
  //       const reader = new FileReader();
  //       reader.onload = () => {
  //         this.selectedFiles.push({ url: reader.result as string, name: file.name, type: file.type }); // Ajout du fichier à la liste
  //       };
  //       reader.readAsDataURL(file); // Lecture du fichier comme URL
  //     }
  //   }
  // }
  // Soumettre les données du parcours
  // submitParcours() {
  //   this.service.url = environment.apiBaseUrl + "parcours";
  //   // Créer un objet avec les données à sauvegarder
  //   this.savedData = {
  //     ...this.savedData,
  //     info: {
  //       nom_parcour: this.formData.info.nom_parcour,
  //       status_type: 1,
  //       status_audiance: 1,
  //       status_disponibilite: 20,
  //       duree: this.formData.info.duree,
  //       objectif: this.formData.info.objectif,
  //       competences: this.selectedSkills.map(skill => skill.id) // Récupérer les IDs des compétences sélectionnées
  //     }
  //   };
  //   console.log(this.savedData);
  //   // Appeler le service pour envoyer les données
  //   this.service.store(this.savedData).subscribe(response => {
  //     console.log('Parcours créé avec succès', response);
  //   }, error => {
  //     console.error('Erreur lors de la création du parcours', error);
  //   });
  // }
  submitParcours() {
    this.service.url = environment.apiBaseUrl + "parcours";
    // Modifier la valeur de l'audience avant d'envoyer les données
    //const audienceValue = this.formData.info.audience === 'Public' ? 0 : 1;
    // Créer un objet avec les données à sauvegarder
    this.savedData = {
      nom_parcour: this.formData.info.nom_parcour,
      prix: 1000, // Exemple d'ajustement pour le prix si applicable
      duree: this.formData.info.duree,
      status_type: 1, // Supposons que 'Gratuit' = 0 et 'Premium' = 1
      status_audiance: 1,
      status_disponibilite: 20, // Valeur d'exemple, ajustez selon vos besoins
      competences: this.selectedSkills.map(skill => skill.id)
    };
    //console.log(this.savedData);

    // Appeler le service pour envoyer les données
    this.service.store(this.savedData).subscribe(response => {
      console.log('Parcours créé avec succès', response);
      // this.idParcours = response.data.parcour.id ?? null;  // Stocker l'ID du parcours
      // console.log(this.idParcours);

    }, error => {
      console.error('Erreur lors de la création du parcours', error);
    });
  }



  // Méthode pour stocker les données par étape

  addVideo(idParcour:number) {
    console.log(idParcour);
    this.displayVideo = true

    // Vérifie si la vidéo n'est pas déjà sélectionnée
    // if (!this.selectedVideos.includes(video)) {
    //   this.selectedVideos.push(video);
    // }
    // console.log('Vidéos sélectionnées :', this.selectedVideos);
  }
  closeModalVideo() {
    this.displayVideo = false;
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

  videoFile: File | null = null; // Variable pour stocker le fichier vidéo

  // Méthode pour capturer le fichier vidéo sélectionné
  onVideoSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.videoFile = event.target.files[0]; // Stocker le fichier vidéo
    }
  }

  // Méthode pour soumettre la vidéo
  // submitVideo() {
  //   console.log(this.idParcours);
  //   if (!this.idParcours || !this.videoFile) {
  //     console.error('ID du parcours ou fichier vidéo manquant');
  //     return;
  //   }
  //   const formData = new FormData();
  //   formData.append('idParcours', this.idParcours.toString()); // Ajouter l'ID du parcours
  //   // formData.append('nomVideo', this.formData.content.video); // Ajouter le nom de la vidéo
  //   formData.append('video', this.videoFile); // Ajouter le fichier vidéo

  //   // Appeler le service pour envoyer la vidéo
  //   this.service.store(formData).subscribe(response => {
  //     console.log('Vidéo créée avec succès', response);
  //     this.closeModals(); // Fermer le modal après succès
  //   }, error => {
  //     console.error('Erreur lors de la création de la vidéo', error);
  //   });
  // }
  // Envoi des vidéos
  submitVideo() {
    const videoFiles = this.selectedFiles.filter(file => file.type.startsWith('video/'));
    const videoFormData = new FormData();
    videoFiles.forEach(video => {
      videoFormData.append('videos', video.rawFile); // Le fichier vidéo
    });
    //videoFormData.append('idParcour', this.idParcour.toString()); // ID du parcours associé
    console.log(videoFormData);

    this.service.store(videoFormData).subscribe({
      next: (response) => {
        Swal.fire('Succès', 'Les vidéos ont été ajoutées avec succès!', 'success');
        this.selectedFiles = this.selectedFiles.filter(file => !file.type.startsWith('video/')); // Vider les vidéos après l'envoi
      },
      error: (error) => {
        Swal.fire('Erreur', 'Échec de l\'envoi des vidéos.', 'error');
      }
    });
  }

  getParcours() {
    this.service.url = environment.apiBaseUrl + "parcours";
    this.service.all().subscribe(resp => {
      this.parcours = resp.data.parcours
     // console.log(this.parcours);
    })
  }

}
