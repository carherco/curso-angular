import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {

  canvas: any;
  ctx: any;

  constructor() { }

  ngOnInit() {
    this.canvas = document.createElement("canvas");
    this.canvas.width = 700;
    this.canvas.height = 600;
    document.getElementById("canvas")!.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
    this.draw(350, 600, 120, 0);
  }

  draw(startX: number, startY: number, len: number, angle: number) {
    this.ctx.beginPath();
    this.ctx.save();

    this.ctx.translate(startX, startY);
    this.ctx.rotate(angle * Math.PI/180);
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(0, -len);
    this.ctx.stroke();

    if(len < 10) {
      this.ctx.restore();
      return;
    }

    this.draw(0, -len, len*0.8, -15);
    this.draw(0, -len, len*0.8, 15);

    this.ctx.restore();
  }

}
