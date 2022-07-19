import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  MarketsState,
  MarketsStateModel,
} from '../markets/state/markets.state';

@Component({
  selector: 'app-symbol-header',
  templateUrl: './symbol-header.component.html',
  styleUrls: ['./symbol-header.component.scss'],
})
export class SymbolHeaderComponent implements OnInit {
  @Select(MarketsState) info$!: Observable<MarketsStateModel>;

  constructor() {}

  ngOnInit(): void {}
}
