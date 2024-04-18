import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-companys',
  templateUrl: './companys.page.html',
  styleUrls: ['./companys.page.scss'],
})
export class CompanysPage implements OnInit {

  type: string = 'wait';

  visitorsWaiting: any = []
  visitorsApproved: any = []
  visitorsReject: any = []
  visitorsFinish: any = []

  constructor() { }

  ngOnInit() {
    this.visitorsWaiting = [
      { name: 'Gabriel', role: 'Engenheiro', phone: '+5511912341234', description: '11/01/2024' },
      { name: 'Marcos', role: 'Engenheiro', phone: '+5511912341234', description: '11/01/2024' },
      { name: 'Ayslan', role: 'Engenheiro', phone: '+5511912341234', description: '11/01/2024' },
    ]
    this.visitorsApproved = [
      { name: 'Lucas', role: 'Engenheiro', phone: '+5511912341234', description: '11/01/2024' },
    ]
  }
  onClick(){ }
  segmentChanged(e: any){
    this.type = e.target.value;
  }

}
