import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post.interface';
import { Observable } from 'rxjs';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post-details',
  templateUrl: './postDetails.component.html',
  styleUrls: ['./postDetails.component.scss']
})
export class PostDetailsComponent implements OnInit {

  postId!: string;

  post: Post = {
    id: '',
    title: '',
    date: '',
    paragraph: '',
  }

  allPosts!: Observable<Post[]>;

  constructor(private firebaseSrv: FirebaseService, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.postId = params['postId'];
      this.loadPostDetails();
    })
    this.loadAllPosts();
  }

  loadAllPosts() {
    this.allPosts = this.firebaseSrv.getAllPosts();
  }

  loadPostDetails() {
    this.firebaseSrv.getPostById(this.postId);
  }
}
