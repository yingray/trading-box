import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { MarketsState } from './shared/components/markets/state/markets.state';
import { OrdersState } from './shared/components/order-list/state/orders.state';

import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';

import { environment } from 'src/environments/environment';
import { OrderFormComponent } from './shared/components/order-form/order-form.component';
import { PositionListComponent } from './shared/components/position-list/position-list.component';
import { SymbolHeaderComponent } from './shared/components/symbol-header/symbol-header.component';
import { OrderListComponent } from './shared/components/order-list/order-list.component';
import { ClosedPositionListComponent } from './shared/components/closed-position-list/closed-position-list.component';
import { OrderbookComponent } from './shared/components/orderbook/orderbook.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,

    // custom
    OrderFormComponent,
    PositionListComponent,
    SymbolHeaderComponent,
    OrderListComponent,
    ClosedPositionListComponent,
    OrderbookComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,

    // Store
    NgxsModule.forRoot([MarketsState, OrdersState], {
      developmentMode: !environment.production,
    }),
    NgxsReduxDevtoolsPluginModule.forRoot(),

    // Nz
    NzTypographyModule,
    NzIconModule,
    NzButtonModule,
    NzGridModule,
    NzPageHeaderModule,
    NzSpaceModule,
    NzSelectModule,
    NzCardModule,
    NzInputModule,
    NzInputNumberModule,
    NzTabsModule,
    NzTableModule,
    NzDividerModule,
    NzTagModule,
    NzModalModule,
    NzStatisticModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
})
export class AppModule {}
