import { Component, Input, OnInit } from '@angular/core';
import { BookmarksService } from '../../shared/services/bookmarks.service';

import { Bookmark } from '../../shared/models/Bookmark';


@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent implements OnInit {

  bookmarkObject?: Array<Bookmark>;

  constructor(private bookmarksService: BookmarksService) { }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
    this.bookmarksService.getBookmarksByUserID(user.uid).subscribe((data: Array<Bookmark>) => {
      this.bookmarkObject = data;
    })
  }

  removeBookmark(bookmarkId: string) {
    this.bookmarksService.deleteBookmark(bookmarkId).then(_ => {}).catch(error => console.log(error));
  }

}
