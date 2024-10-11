import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashbordComponent } from '../dashboard/dashbord.component';
import { ListParcoursComponent } from './list-parcours/list-parcours.component';

@Component({
  selector: 'app-formateur',
  standalone: true,
  imports: [RouterOutlet,CommonModule,DashbordComponent,ListParcoursComponent ],
  templateUrl: './formateur.component.html',
  styleUrl: './formateur.component.css'
})
export class FormateurComponent {

}
