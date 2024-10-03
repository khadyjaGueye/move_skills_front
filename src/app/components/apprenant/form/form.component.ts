import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { Question } from '../../../interfaces/model';


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

  open: boolean = false;

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
  // Scores pour chaque couleur
  scores: { [key: string]: number } = {
    red: 0,
    yellow: 0,
    green: 0,
    blue: 0
  };

  constructor() { }

  ngOnInit(): void {
  }

  openModal() {
    console.log("bonjour");
    this.open = true
  }



  selectedScore: number | null = null;

  // Fonction pour gérer le choix du score
  selectScore(points: number) {
    const currentAnswer = this.questions[this.currentQuestionIndex].answers[this.currentAnswerIndex];

    // Ajouter les points au score de la couleur
    this.scores[currentAnswer.color] += points;

    // Enlever le point sélectionné des points disponibles
    this.availablePoints = this.availablePoints.filter(p => p !== points);

    // Si toutes les options ont été utilisées pour cette réponse
    if (this.availablePoints.length === 0) {
      // Réinitialiser les options de points
      this.availablePoints = [6, 3, 1, 0];

      // Passer à la réponse suivante
      this.currentAnswerIndex++;
    }

    // Si toutes les réponses ont été traitées pour cette question
    if (this.currentAnswerIndex >= this.questions[this.currentQuestionIndex].answers.length) {
      // Passer à la question suivante
      this.currentAnswerIndex = 0; // Réinitialiser l'index de réponse
      this.currentQuestionIndex++;
    }
  }

  // Fonction pour calculer le score total en pourcentage
  calculateTotalScore() {
    const scoresValues = Object.values(this.scores) as number[];  // Assurez-vous que les valeurs sont des nombres
    const totalPoints = scoresValues.reduce((acc: number, val: number) => acc + val, 0);
    return (totalPoints / (this.questions.length * 6)) * 100; // Le maximum de points est 6 par question
  }


  // Fonction pour trouver la couleur ayant le plus de points
  getHighestScore() {
    const highestColor = Object.keys(this.scores).reduce((a, b) => this.scores[a] > this.scores[b] ? a : b);
    return `La couleur avec le plus de points est ${highestColor} avec ${this.scores[highestColor]} points.`;
  }
  // Obtenir la couleur avec le score le plus élevé
  getHighestScoreColor() {
    let highestColor = '';
    let highestPoints = 0;

    for (const color in this.scores) {
      const points = this.scores[color];
      console.log(`Couleur: ${color}, Points: ${points}`);

      if (points > highestPoints) {
        highestPoints = points;
        highestColor = color;
      }
    }

    console.log(`La couleur avec le plus grand nombre de points est : ${highestColor} avec ${highestPoints} points.`);

    return {
      highestColor,
      highestPoints
    };
  }

  // Cette fonction est appelée à chaque sélection de réponse
  submitAnswer(points: number, answer: Answer) {
    // Mettre à jour le score en fonction de la couleur de la réponse sélectionnée
    this.scores[answer.color] += points;

    // Retirer la réponse sélectionnée
    this.remainingAnswers = this.remainingAnswers.filter(a => a !== answer);

    // Retirer le point sélectionné de la liste des points restants
    this.remainingPoints = this.remainingPoints.filter(p => p !== points);

    // Si toutes les réponses de cette question sont éliminées, passer à la question suivante
    if (this.remainingAnswers.length === 0 || this.remainingPoints.length === 0) {
      this.currentQuestion++;
      if (this.currentQuestion < this.questions.length) {
        // Réinitialiser les réponses et les points pour la question suivante
        this.remainingAnswers = [...this.questions[this.currentQuestion].answers];
        this.remainingPoints = [6, 3, 1, 0];
      }
    }
  }

  
}











