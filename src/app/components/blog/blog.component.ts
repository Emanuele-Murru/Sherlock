import { Component, OnInit } from '@angular/core';
import { Firestore,
collection,
addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  constructor(private firestore: Firestore) { }

  ngOnInit(): void {
  }

  addData(f:any) {

    const collectionInstance = this.firestore.collection(this.firestore, 'blog');

    addDoc(collectionInstance, f.value)
    .then(() => {
      console.log("Data saved successfully");
    })
    .catch((err) => {
      console.log(err);

    })
    console.log(f.value);

  }

}
