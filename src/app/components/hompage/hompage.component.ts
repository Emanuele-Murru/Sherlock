import { Component, OnInit } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-hompage',
  templateUrl: './hompage.component.html',
  styleUrls: ['./hompage.component.scss']
})
export class HompageComponent implements OnInit {

  constructor(private firestore: Firestore) { }

  ngOnInit(): void {
  }

}
