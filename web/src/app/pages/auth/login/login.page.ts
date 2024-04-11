import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  type: string = 'visitor';

  constructor() { }

  ngOnInit() {
  }
  onClick() {
  }
  segmentChanged(e: any) {
    this.type = e.target.value
  }

  submitCompany() {
    alert('submitCompany')
  }
  submitVisitor() {
    alert('submitVisitor')
  }

}
