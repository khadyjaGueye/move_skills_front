import { Component } from '@angular/core';
import { Answer, Question } from '../../../interfaces/model';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent {

  questions: Question[] = [
    {
      text: "Dans la vie générale, ce qui me motive c'est...",
      answers: [
        { text: "Ce qui me correspond (6 pts)", points: 6, color: 'red' },
        { text: "Ce qui me correspond (3 pts)", points: 3, color: 'yellow' },
        { text: "Ce qui me correspond assez (1 pt)", points: 1, color: 'green' },
        { text: "Ce qui me correspond pas du tout (0 pt)", points: 0, color: 'blue' },
      ]
    }
  ];
  scores = {
    red: 0,
    yellow: 0,
    green: 0,
    blue: 0
  };

  submitAnswer(question: Question, answer: Answer) {
    // this.scores[answer.color] += answer.points;

  }

  // getResult() {
  //   // Logique pour calculer la couleur avec le score le plus élevé
  //   const maxScoreColor = Object.keys(this.scores).reduce((a, b) => this.scores[a] > this.scores[b] ? a : b);
  //   return maxScoreColor;
  // }

}
