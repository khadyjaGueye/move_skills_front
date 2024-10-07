import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { CommonModule } from '@angular/common';
import { DashbordComponent } from '../dashboard/dashbord.component';




@Component({
  selector: 'app-apprenant',
  standalone: true,
  imports: [RouterOutlet,ListComponent,FormComponent,CommonModule,DashbordComponent],
  templateUrl: './apprenant.component.html',
  styleUrl: './apprenant.component.css'
})
export class ApprenantComponent implements OnInit {

  display:string = "list";
  isApprenant:boolean= false;

  ngOnInit(): void {

  }

list(){
  console.log('ddddddddddddddddddd');
  this.display="list";
  this.isApprenant = true;
}
form(){
  this.display="form";
  this.isApprenant = true;
}

}
