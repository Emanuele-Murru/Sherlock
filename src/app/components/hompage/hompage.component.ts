import { Component, OnInit } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hompage',
  templateUrl: './hompage.component.html',
  styleUrls: ['./hompage.component.scss']
})
export class HompageComponent implements OnInit {

  ngxScrollToDuration: number;
  ngxScrollToEasing: string;

  constructor(private firestore: Firestore, private router: Router) {

    this.ngxScrollToDuration = 1500;
    this.ngxScrollToEasing = 'EaseInOutQuint';

  }

  ngOnInit(): void {
  }

  goToBlog():void {
    this.router.navigate(['/blog']);
  }

}
