import { Injectable } from '@angular/core';
import { AngularFirestore , AngularFirestoreDocument } from '@angular/fire/firestore';
import {snapshotChanges} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private firestore: AngularFirestore
  ) {}

  // create user
  createUser(data: any){
    return this.firestore.collection('user').add(data);
  }
  //find user
  public example(docmentID: string, data: any) {
    return this.firestore.collection('user',ref => ref.where('user','==', docmentID)).snapshotChanges();
  }
  // get a user
  public getuser(documentId: string) {
    return this.firestore.collection('user').doc(documentId).snapshotChanges();
  }
  // get all users
  public getUsers() {
    return this.firestore.collection('user').snapshotChanges();
  }
  // update user
  public updateUser(documentId: string, data: any) {
    return this.firestore.collection('user').doc(documentId).set(data);
  }


}
