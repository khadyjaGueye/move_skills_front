import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApprenantService } from '../../../services/apprenants/apprenant.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Data, Model } from '../../../interfaces/model';
import { TestService } from '../../../services/test.service';
import { tap } from 'rxjs';

interface Answer {
  text: string;
  points: number;
  color: string;
}

interface Question {
  text: string;
  answers: Answer[];
}

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})

export class FormComponent implements OnInit {

  // Tableau de questions
  questions: Question[] = [
    {
      text: "Dans la vie générale, ce qui me motive c'est...",
      answers: [
        { text: "Des buts et de l\'action", points: 6, color: 'red' },
        { text: "Des relations profondes et harmonieuses", points: 3, color: 'yellow' },
        { text: "La stabilité et le sentiment de maîtriser son existence", points: 1, color: 'green' },
        { text: "Participer dans l\'enthousiasme et découvrir", points: 0, color: 'blue' }
      ]
    },
    {
      text: "Face au changement, j'anticipe d'abord les...",
      answers: [
        { text: "Chances et opprtunités", points: 6, color: 'red' },
        { text: "Processus et stratégie", points: 3, color: 'yellow' },
        { text: "Risque et difficultés", points: 1, color: 'green' },
        { text: "Enjeux et gain", points: 0, color: 'blue' }
      ]
    },
    {
      text: "Au quotidien; je me montre le plus souvent...",
      answers: [
        { text: "Calme et réflexif", points: 6, color: 'red' },
        { text: "determiné et actif", points: 3, color: 'yellow' },
        { text: "Créatif et synpathiue", points: 1, color: 'green' },
        { text: "Prudent et concilliant", points: 0, color: 'blue' }
      ]
    },
    {
      text: "Quand les choses ne se passent pas comme je veux, je deviens...",
      answers: [
        { text: "Impatient,colérique", points: 6, color: 'red' },
        { text: "Désordonné et chaotique", points: 3, color: 'yellow' },
        { text: "Lent borné", points: 1, color: 'green' },
        { text: "Tatillon, pinailleur", points: 0, color: 'blue' }
      ]
    },
    {
      text: "Pour aider le autres, je sais (je suis bon pour...",
      answers: [
        { text: "Ecouter sans préjugé, partager sincérement", points: 6, color: 'red' },
        { text: "Encourager, pousser à décidé", points: 3, color: 'yellow' },
        { text: "Expliquer, clarifier, analyser", points: 1, color: 'green' },
        { text: "Inspirer;donner envie", points: 0, color: 'blue' }
      ]
    },
    {
      text: "Pour etre efficase au travail, je préfére surtout disposer de...",
      answers: [
        { text: "Regles et consignes claires, et cotoyer des gens compétents", points: 6, color: 'red' },
        { text: "Variété; changement et ne pas devoir trop se prend au sérieux", points: 3, color: 'yellow' },
        { text: "Action, mouvement,risque, ambition et sentir que je peut décider", points: 1, color: 'green' },
        { text: "Harmonie avec mescollégues, et pouvoir avancer à mon rytme", points: 0, color: 'blue' }
      ]
    },
    {
      text: "Ce que j'apprécie dans une équipe,...",
      answers: [
        { text: "Se sentir plus fort pour viser plus haut et gagner", points: 6, color: 'red' },
        { text: "flexibilité et bonne volonté", points: 3, color: 'yellow' },
        { text: "Réflexion et analyse ", points: 1, color: 'green' },
        { text: "Esprit de décision et d'organisation", points: 0, color: 'blue' }
      ]
    },
    {
      text: "Dans les réuinion, je fais preuve de...",
      answers: [
        { text: "Optimiser et sens de l'humour", points: 6, color: 'red' },
        { text: "Flexibité et bonne volonté", points: 3, color: 'yellow' },
        { text: "Réflexion et analyse", points: 1, color: 'green' },
        { text: "Esprit de décision et d'organisation", points: 0, color: 'blue' }
      ]
    },
    {
      text: "Je contribue à resoudre les conflits en...",
      answers: [
        { text: "Etant patient tolérant, et flexible", points: 6, color: 'red' },
        { text: "Impliquant tous les acteurs autour de solution originales", points: 3, color: 'yellow' },
        { text: "Me monrant proactif direct, concret", points: 1, color: 'green' },
        { text: "Faisant preuve d'objectivité, de rationalité, de recul", points: 0, color: 'blue' }
      ]
    },
    {
      text: "Ce que je déteste dans les changement c'est quand...",
      answers: [
        { text: "C'est le régle de la confusion", points: 6, color: 'red' },
        { text: "Il y a des gagnants et des perdants", points: 3, color: 'yellow' },
        { text: "On se peut pas y participer directement", points: 1, color: 'green' },
        { text: "Ca n'avance pas assez vite!", points: 0, color: 'blue' }
      ]
    },
  ];

  currentIndex: number = 1;
  totalColors: { [key: string]: number } = { red: 0, green: 0, blue: 0, yellow: 0 };
  totalScore: number = 0;
  result: string = '';
  currentQuestionIndex: number = 0; // Index de la question actuelle
  currentAnswerIndex: number = 0; // Index de la réponse actuelle
  availablePoints: number[] = [6, 3, 1, 0]; // Options de points disponibles
  currentQuestion = 0;
  remainingAnswers: Answer[] = [...this.questions[this.currentQuestion].answers];
  remainingPoints = [6, 3, 1, 0]; // Liste des points restants
  displayColorCharacteristics: boolean = false;
  showResultsModal: boolean = false; // Indicateur pour afficher la modal
  message: string = "";
  // Scores pour chaque couleur
  scores: { [key: string]: number } = {
    red: 0,
    yellow: 0,
    green: 0,
    blue: 0
  };
  open: boolean = false;
  testStarted: boolean = false; // Nouvelle variable pour gérer l'affichage du test
  token: string = "";

  constructor(private service: ApprenantService, private test: TestService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem("token")!;
  }

  openModal() {
    this.open = true;
    // Affiche les caractéristiques après la fermeture du modal
  }

  // Fermer la modal
  closeModal() {
    this.showResultsModal = false;
    this.displayColorCharacteristics = true;
  }

  // Fonction pour démarrer le test
  startTest() {
    this.testStarted = true; // Change l'état pour afficher le test
  }


  // Fonction pour soumettre la réponse sélectionnée
  submitAnswer(points: number, answer: Answer) {
    // Ajouter les points au score de la couleur
    this.scores[answer.color] += points;
    // Retirer la réponse et le point sélectionnés
    this.remainingAnswers = this.remainingAnswers.filter(a => a !== answer);
    this.remainingPoints = this.remainingPoints.filter(p => p !== points);

    // Si toutes les réponses sont éliminées, passer à la question suivante
    if (this.remainingAnswers.length === 0 || this.remainingPoints.length === 0) {
      this.currentQuestionIndex++;
      if (this.currentQuestionIndex < this.questions.length) {
        // Réinitialiser les réponses et points pour la prochaine question
        this.remainingAnswers = [...this.questions[this.currentQuestionIndex].answers];
        this.remainingPoints = [6, 3, 1, 0];
      } else {
        this.showResultsModal = true; // Afficher la modal avec les résultats
      }
    }
  }

  // Calcul du score total en pourcentage
  calculateTotalScore(): number {
    const totalPoints = Object.values(this.scores).reduce((acc, val) => acc + val, 0);
    return (totalPoints / (this.questions.length * 6)) * 100;
  }

  calculateTotalColorScore(): number {
    return this.scores['red'] + this.scores['yellow'] + this.scores['green'] + this.scores['blue'];
  }

  // Fonction pour obtenir la couleur avec le plus de points
  getHighestScoreColor() {
    const highestColor = Object.keys(this.scores).reduce((a, b) => this.scores[a] > this.scores[b] ? a : b);
    return highestColor;
  }

  // Afficher les résultats après le test
  showResults() {
    this.showResultsModal = true; // Activer la modal pour afficher les résultats
  }

  //afficher le cercle et ces couleurs
  getCircleStyle() {
    const totalPoints = this.scores['red'] + this.scores['yellow'] + this.scores['green'] + this.scores['blue'];
    // Calcule les pourcentages basés sur les scores respectifs
    const redPercentage = (this.scores['red'] / totalPoints) * 100;
    const yellowPercentage = (this.scores['yellow'] / totalPoints) * 100;
    const greenPercentage = (this.scores['green'] / totalPoints) * 100;
    const bluePercentage = (this.scores['blue'] / totalPoints) * 100;
    // Retourne les styles pour `conic-gradient`
    return {
      'background': `conic-gradient(
      red 0% ${redPercentage}%,
      yellow ${redPercentage}% ${redPercentage + yellowPercentage}%,
      green ${redPercentage + yellowPercentage}% ${redPercentage + yellowPercentage + greenPercentage}%,
      blue ${redPercentage + yellowPercentage + greenPercentage}% 100%
    )`
    };
  }

  // Style pour afficher le nom de la couleur sur le disque
  getColorLabelStyle(color: string, label: string) {
    return {
      'position': 'absolute',
      'font-size': '12px',
      'font-weight': 'bold',
      'color': color
    };
  }
  // Calculer les pourcentages basés sur les scores
  calculatePercentages() {
    const totalPoints = this.scores['red'] + this.scores['yellow'] + this.scores['green'] + this.scores['blue'];
    return {
      red: (this.scores['red'] / totalPoints) * 100,
      yellow: (this.scores['yellow'] / totalPoints) * 100,
      green: (this.scores['green'] / totalPoints) * 100,
      blue: (this.scores['blue'] / totalPoints) * 100,
    };
  }
  
  sendResults() {
    const percentages = this.calculatePercentages();
    const data = {
      red: percentages.red,
      yellow: percentages.yellow,
      green: percentages.green,
      blue: percentages.blue
    };
    // Envoyer les données avec le token
    this.test.store(data, this.token).pipe(tap({
      next: (resp) => {
        console.log(resp);
        //this.handleResponse(resp.data.message);
      }, complete: () => {
        console.log("Observable Termite");
      }, error: (error) => {
        console.log(error);
        //this.handleResponse(error);
      }
    })).subscribe();
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
}











