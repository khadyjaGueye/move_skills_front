import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserInfo } from '../../interfaces/model';

@Component({
  selector: 'app-dashbord',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './dashbord.component.html',
  styleUrl: './dashbord.component.css'
})
export class DashbordComponent implements OnInit {

  role: string = "";

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem("user")!);
    this.role = user.role;
  }

}
