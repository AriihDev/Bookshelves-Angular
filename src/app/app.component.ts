import { Component } from '@angular/core';
import { initializeApp } from 'firebase/app';
import 'firebase/compat/app';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {

const firebaseConfig = {
  apiKey: "AIzaSyDJGKTFxpwrdZSp-5R7ElVCc6n0UGHsq9I",
  authDomain: "ariihdev---bibliotheque.firebaseapp.com",
  projectId: "ariihdev---bibliotheque",
  storageBucket: "ariihdev---bibliotheque.appspot.com",
  messagingSenderId: "223277221889",
  appId: "1:223277221889:web:b50e8f47e07e7b26ecd800"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();

  }
}
