import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng-lts/table';
import { TagModule } from 'primeng-lts/tag';
import { MenubarModule } from 'primeng-lts/menubar';
import { DropdownModule } from 'primeng-lts/dropdown';
import { InputNumberModule } from 'primeng-lts/inputnumber';
import { SelectButtonModule } from 'primeng-lts/selectbutton';
import { CalendarModule } from 'primeng-lts/calendar';
import { ButtonModule } from 'primeng-lts/button';
import { AccordionModule } from 'primeng-lts/accordion';
import { CardModule } from 'primeng-lts/card';
import { BadgeModule } from 'primeng-lts/badge';

import { BybitService } from './core/services/bybit/bybit.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    TableModule,
    TagModule,
    MenubarModule,
    DropdownModule,
    InputNumberModule,
    SelectButtonModule,
    CalendarModule,
    ButtonModule,
    AccordionModule,
    CardModule,
    BadgeModule,
  ],
  providers: [BybitService],
  bootstrap: [AppComponent],
})
export class AppModule {}
