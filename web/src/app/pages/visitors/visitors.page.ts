import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-visitors',
  templateUrl: './visitors.page.html',
  styleUrls: ['./visitors.page.scss'],
})
export class VisitorsPage implements OnInit {

  visitor: { name: string, avatar: string };

  constructor() { }

  ngOnInit() {
    this.getVisitor();
  }

  getVisitor() {
    const storage = localStorage.getItem('me');
    this.visitor = storage ? JSON.parse(storage) : {};
  }

  getVisits() {

  }

}
