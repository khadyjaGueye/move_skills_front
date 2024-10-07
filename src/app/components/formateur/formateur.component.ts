import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashbordComponent } from '../dashboard/dashbord.component';

@Component({
  selector: 'app-formateur',
  standalone: true,
  imports: [RouterOutlet,CommonModule,DashbordComponent],
  templateUrl: './formateur.component.html',
  styleUrl: './formateur.component.css'
})
export class FormateurComponent {

}
