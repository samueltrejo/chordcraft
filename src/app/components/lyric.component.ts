import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-lyric',
  template: `
    <tbody>
      <tr class="chords">
        <td *ngFor="let chord of chords">{{chord}}</td>
      </tr>
      <tr class="lyrics">
        <td *ngFor="let verse of verses">{{verse}}</td>
      </tr>
    </tbody>
  `,
  styles: [
  ]
})
export class LyricComponent implements OnInit {
  @Input() lyric: string;
  chords: string[] = [];
  verses: string[] = [];

  constructor( ) { }

  ngOnInit(): void {
    const bracketPos = this.lyric.indexOf('[');
    if (this.lyric.length != 0 && bracketPos == -1) {
      this.verses.push(this.lyric);
    } else if (bracketPos != -1) {
      while (this.lyric.indexOf('[') !== -1) {
        if (this.lyric.indexOf('[') !== 0) {
          const currentBracketPos = this.lyric.indexOf('[');
          this.chords.push(' ');
          this.verses.push(this.lyric.slice(0, currentBracketPos));
          this.lyric = this.lyric.slice(bracketPos);
        } else if (this.lyric.indexOf('[') === 0) {
          const sndBracketPos = this.lyric.indexOf(']');
          const chord = this.lyric.slice(1, sndBracketPos)
          this.chords.push(chord);
          this.lyric = this.lyric.slice(sndBracketPos + 1);

          const nextBracketPos = this.lyric.indexOf('[');
          if (nextBracketPos !== -1) {
            this.verses.push(this.lyric.slice(0, nextBracketPos));
            this.lyric = this.lyric.slice(nextBracketPos);
          } else if (nextBracketPos === -1) {
            this.verses.push(this.lyric);
          }
        }
      }
    }
  }

}
