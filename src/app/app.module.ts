import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HompageComponent } from './components/hompage/hompage.component';

import { RouterModule, Route } from '@angular/router';
import { FormsModule } from '@angular/forms';

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
    HompageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
