import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HompageComponent } from './components/hompage/hompage.component';
import { BlogComponent } from './components/blog/blog.component';
import { PostDetailsComponent } from './components/postDetails/postDetails.component';

import { RouterModule, Route } from '@angular/router';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

const routes: Route[] = [
  {
    path: '',
    component: HompageComponent,
  },
  {
    path: 'blog',
    component: BlogComponent
  },
  // {
  //   path: 'postDetails/:postId',
  //   component: PostDetailsComponent
  // }
]

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    HompageComponent,
    BlogComponent,
    PostDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot(routes),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    ScrollToModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
