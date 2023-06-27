import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-contador',
  templateUrl: './contador.component.html',
  styleUrls: ['./contador.component.scss'],
})
export class ContadorComponent implements OnInit {

  @Input() contador: number;

  constructor() { }

  ngOnInit() {
    console.log(this.contador)
  }

}
