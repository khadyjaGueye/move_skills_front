import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-core',
  standalone: true,
  imports: [
    RouterOutlet,
    NgIf,
    RouterLink
  ],
  templateUrl: './core.component.html',
  styleUrl: './core.component.css'
})
export class CoreComponent {

}
