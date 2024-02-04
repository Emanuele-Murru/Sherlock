import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirebaseService } from 'src/app/services/firebase.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from '../models/post.interface';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { state, style, trigger, transition, animate, } from '@angular/animations';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  animations: [
    trigger('slideInFromLeft', [
      transition(':enter', [
        style({
          transform: 'translateX(-80%)'
        }),
        animate('1500ms ease-out',
        style({
          transform: 'translateX(0)'
        }))
      ])
    ]),
    trigger('slideDown', [
      transition(':enter', [
        style({
          transform: 'translateY(-80%)'
        }),
        animate('1600ms ease-out', style({
          transform: 'translateY(0)'
        }))
      ])
    ])
  ]
})
export class BlogComponent implements OnInit {

  postForm! : FormGroup;
  post: Post = {
    id: '',
    title: '',
    date: '',
    paragraph: '',
  }

  allPosts!: Observable<Post[]>;

  openCardId: string | null= null;
  toggleCard(post: Post): void {
    this.openCardId = this.openCardId === post.id ? null : post.id;
  }

  constructor(private db: AngularFirestore, private fb: FormBuilder, private firebaseSrv: FirebaseService, private router: Router, private spinner: NgxSpinnerService) {
    this.postForm = this.fb.group({
      title:['', Validators.required],
      date:['', Validators.required],
      paragraph:['', Validators.required],
    })
   }

  ngOnInit(): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 2500)
    this.loadAllPosts();
    this.setForm();
  }

  setForm() {
    this.postForm = this.fb.group({
      title: [this.post.title, [Validators.required]],
      date: [this.post.date, [Validators.required]],
      paragraph: [this.post.paragraph, [Validators.required]],
    })
  }

  submit() {
    if (this.postForm.valid) {
      const formValues = this.postForm.value;

      this.firebaseSrv.addPost(formValues).then(() => {
        console.log('Post aggiunto con successo al database.');
        this.postForm.reset();
        this.loadAllPosts();
      });
    } else {
      console.log('Il form non è valido. Controlla i campi obbligatori.');
    }
  }

  loadAllPosts() {
    this.allPosts = this.firebaseSrv.getAllPosts();
    // this.spinner.hide();
  }

  deletePost(postId: string) {
    this.firebaseSrv.deletePost(postId);
    console.log(postId);
    this.loadAllPosts();
  }
}
