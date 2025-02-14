import { Component, Input } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interface';

@Component({
  selector: 'gifs-card',
  standalone: false,
  templateUrl: './gifs-card.component.html',
})
export class GifsCardComponent {
  @Input()
  public gif!: Gif;
}
