import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

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
