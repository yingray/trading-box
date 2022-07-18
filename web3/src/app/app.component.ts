import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { GetTradingRecordAction } from './shared/components/markets/state/markets.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'web3';

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new GetTradingRecordAction('ETHUSD'));
  }
}
