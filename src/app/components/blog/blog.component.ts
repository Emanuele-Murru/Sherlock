import { Component, OnInit } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { CollectionReference, collection, DocumentData, addDoc, deleteDoc, doc, updateDoc } from '@firebase/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirebaseService } from 'src/app/services/firebase.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from '../models/post.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
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
  // selectedPost$?: Post;
  // selectedPost!: Post;

  constructor(private firestore: Firestore, private db: AngularFirestore, private fb: FormBuilder, private firebaseSrv: FirebaseService) {
    this.postForm = this.fb.group({
      title:['', Validators.required],
      date:['', Validators.required],
      paragraph:['', Validators.required],
    })
   }

  ngOnInit(): void {
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
  }

  deletePost(postId: string) {
    this.firebaseSrv.deletePost(postId);
    console.log(postId);

    this.loadAllPosts();
  }

}
