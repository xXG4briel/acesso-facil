import { Component, Input, OnInit } from '@angular/core';
import { Visit } from 'src/app/models';

@Component({
  selector: 'app-card-visits',
  templateUrl: './card-visits.component.html',
  styleUrls: ['./card-visits.component.scss'],
})
export class CardVisitsComponent  implements OnInit {

  @Input() visitor: Visit;
  @Input() delete: (id: string, documentVisitId: string) => void;

  constructor() { }

  ngOnInit() {}

  getAddresVisitor(address: { city: string, number: string, state: string, street: string, country: string, zipCode: string }) {
    return `${address.street || 'Sem Rua'}, ${address.number || 'Sem número'}, ${address.zipCode || '00000-000'} - ${address.city || 'N/A'}`;
  }

}
