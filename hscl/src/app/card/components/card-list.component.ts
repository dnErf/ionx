import { Component, Input } from '@angular/core';

@Component({
  selector: 'card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent {

  @Input() items:any[] = [];
  @Input() listName:string;
  @Input() navigateTo:any;

}
