import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat4-b',
  templateUrl: './chat4-b.page.html',
  styleUrls: ['./chat4-b.page.scss'],
})
export class Chat4BPage implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
  }

  VolverAInicio(){
    this.router.navigateByUrl('home');
  }

}
