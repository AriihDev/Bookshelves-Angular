import { Injectable } from '@angular/core';
import { finalize, Subject } from 'rxjs';
import { Book } from '../models/Book.model';
import firebase from "firebase/compat/app";
import 'firebase/compat/database';
import 'firebase/compat/storage';
import 'firebase/compat/auth';
import 'firebase/compat/analytics';



@Injectable({
  providedIn: 'root'
})
export class BooksService {

  books: Book[] = [];
  booksSubject = new Subject<Book[]>();
  storage: any;
  uploadPercent: any;
  downloadURL: any;
  image: any;

  constructor() { }

  emitBooks() {
    this.booksSubject.next(this.books);
  }

  saveBooks() {
    firebase.database().ref('/books').set(this.books);
  }

  getBooks() {
    firebase.database().ref('/books')
    .on('value',(data) => {
      this.books = data.val() ? data.val() : [];
    });
  }

  getSingleBook(id: number): Promise<Book> {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/books/' + id).once('value').then(
          (data)=> {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createNewBook(newBook: Book) {
    this.books.push(newBook);
    this.saveBooks();
    this.emitBooks();
  }

  removeBook(book: Book) {
    // if(book.photo) {
    //   const storageRef = firebase.storage().refFromURL(book.photo);
    //   storageRef.delete().then(
    //     () => {
    //       console.log('Photo supprimée');
    //     }
    //   ).catch(
    //     (error) => {
    //       console.log('Fichier non trouvée : ' + error);
    //     }
    //   );
    // }
    const bookIndexToRemove = this.books.findIndex(
      (bookEl) => {
        if(bookEl === book) {
          return 'true';
        }
        return 'true';
      }
    );
    this.books.splice(bookIndexToRemove, 1);
    this.saveBooks();
    this.emitBooks();
  }

  uploadFile(file: File): Promise<any>  {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('image/' + almostUniqueFileName + file.name).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement…');
          },
          (error) => {
            console.log('Erreur de chargement ! : ' + error);
            reject();
          },
          () => {
            resolve(upload.snapshot.ref.getDownloadURL());
          }
        );
      }
    );
  }
}

