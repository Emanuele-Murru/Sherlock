import { Injectable } from '@angular/core';
import { Post } from '../components/models/post.interface';
import { CollectionReference, collection, DocumentData, addDoc, deleteDoc, doc, updateDoc, getDocs, query, where } from '@firebase/firestore';
import { Firestore, collectionData, docSnapshots } from '@angular/fire/firestore'
import { Observable } from 'rxjs';
import { AngularFirestore, DocumentReference, DocumentSnapshot } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private postsCollection: CollectionReference<DocumentData>;

  constructor(private fs: Firestore, private ngFirebase: AngularFirestore) {
    this.postsCollection = collection(this.fs, 'posts');
  }

  addPost(post: Post): Promise<DocumentReference<DocumentData>> {
    post.id = doc(collection(this.fs, 'id')).id;
    return addDoc(collection(this.fs, 'Posts'), post) as unknown as Promise<DocumentReference<DocumentData>>;
  }

  getAllPosts(): Observable<Post[]> {
    const collectionInstance = collection(this.fs, 'Posts');
    return collectionData(collectionInstance) as Observable<Post[]>;
    console.log(collectionData(collectionInstance));
  }

  deletePost(id: string) {
    const docInstance = doc(this.fs, 'Posts', id);
    deleteDoc(docInstance)
    .then ((val) => {
      console.log("Il post è stato eliminato con successo.",val);
    })
  }

  async getPostById(postId: string) {
    const q = query(collection(this.fs, 'Posts'), where("id", "==", true));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    })
  }
}
