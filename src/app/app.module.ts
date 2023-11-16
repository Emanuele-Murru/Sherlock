import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HompageComponent } from './components/hompage/hompage.component';
import { BlogComponent } from './components/blog/blog.component';

import { RouterModule, Route } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';

const routes: Route[] = [
  {
    path: '',
    component: HompageComponent
  },
]

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    HompageComponent,
    BlogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
