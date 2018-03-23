import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Contas } from '../../../blog-model/schema';

@Component({
  selector: 'app-simple-list',
  templateUrl: './simple-list.component.html',
  styleUrls: ['./simple-list.component.scss']
})
export class SimpleListComponent implements OnInit {

  @Input() items: Contas[] = [];
  @Output() onDeleteContas = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  deleteItem(contaId: string) {
    this.onDeleteContas.emit(contaId);
  }

}
