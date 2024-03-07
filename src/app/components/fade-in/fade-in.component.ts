import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngp-fade-in',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './fade-in.component.html',
  styleUrl: './fade-in.component.sass',
  host: {
    '[class.visible]': 'visible',
    '[style.display]': `'block'`
  }
})
export class FadeInComponent implements OnInit {
  public visible: boolean = false

  public constructor () {}

  public ngOnInit(): void {
    setTimeout(() => {
      this.visible = !this.visible;
    }, 500);
  }
}
