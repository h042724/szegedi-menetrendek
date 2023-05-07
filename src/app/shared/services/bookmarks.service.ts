import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Bookmark } from '../models/Bookmark';

@Injectable({
  providedIn: 'root'
})
export class BookmarksService {

  collectionName = 'Bookmark';

  constructor(private afs: AngularFirestore) { }

  getBookmarksByUserID(userId: string) {
    return this.afs.collection<Bookmark>(this.collectionName, ref => ref.where('user_id', '==', userId)).valueChanges();
  }

  addBookmark(lineId: string, userId: string) {
    const bookmark: Bookmark = {
      id: this.afs.createId(),
      line_id: lineId,
      user_id: userId
    }
    return this.afs.collection<Bookmark>(this.collectionName).doc(bookmark.id).set(bookmark);
  }

  deleteBookmark(bookmarkId: string) {
    return this.afs.collection<Bookmark>(this.collectionName).doc(bookmarkId).delete();
  }
}
