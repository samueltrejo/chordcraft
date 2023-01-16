import { Component, Input, OnInit } from '@angular/core';

const notes = {
  a: new Audio('https://awiclass.monoame.com/pianosound/set/6.wav'),//a - 1
  as: new Audio('https://awiclass.monoame.com/pianosound/set/6.5.wav'),//a# - 2
  b: new Audio('https://awiclass.monoame.com/pianosound/set/7.wav'),//b - 3
  c: new Audio('https://awiclass.monoame.com/pianosound/set/1.wav'),//c - 4
  cs: new Audio('https://awiclass.monoame.com/pianosound/set/1.5.wav'),//c# - 5
  d: new Audio('https://awiclass.monoame.com/pianosound/set/2.wav'),//d - 6
  ds: new Audio('https://awiclass.monoame.com/pianosound/set/2.5.wav'),//d# - 7
  e: new Audio('https://awiclass.monoame.com/pianosound/set/3.wav'),//e - 8
  f: new Audio('https://awiclass.monoame.com/pianosound/set/4.wav'),//f - 9
  fs: new Audio('https://awiclass.monoame.com/pianosound/set/4.5.wav'),//f# - 10
  g: new Audio('https://awiclass.monoame.com/pianosound/set/5.wav'),//g - 11
  gs: new Audio('https://awiclass.monoame.com/pianosound/set/5.5.wav')//g# - 12
};

const chords = [
  { name: 'a', root: notes.a, quality: '', notes: [ notes.cs, notes.e ] },
  { name: 'a#', root: notes.as, quality: '', notes: [ notes.d, notes.f ] },
  { name: 'b', root: notes.b, quality: '', notes: [ notes.ds, notes.fs ] },
  { name: 'c', root: notes.c, quality: '', notes: [ notes.e, notes.g ] },
  { name: 'c#', root: notes.cs, quality: '', notes: [ notes.f, notes.gs ] },
  { name: 'd', root: notes.d, quality: '', notes: [ notes.fs, notes.a ] },
  { name: 'd#', root: notes.ds, quality: '', notes: [ notes.g, notes.as ] },
  { name: 'e', root: notes.e, quality: '', notes: [ notes.gs, notes.b ] },
  { name: 'f', root: notes.f, quality: '', notes: [ notes.a, notes.c ] },
  { name: 'f#', root: notes.fs, quality: '', notes: [ notes.as, notes.cs ] },
  { name: 'g', root: notes.g, quality: '', notes: [ notes.b, notes.d ] },
  { name: 'g#', root: notes.gs, quality: '', notes: [ notes.c, notes.ds ] },
  { name: 'am', root: notes.a, quality: 'm', notes: [ notes.c, notes.e ] },
  { name: 'a#m', root: notes.as, quality: 'm', notes: [ notes.cs, notes.f ] },
  { name: 'bm', root: notes.b, quality: 'm', notes: [ notes.d, notes.fs ] },
  { name: 'cm', root: notes.c, quality: 'm', notes: [ notes.ds, notes.g ] },
  { name: 'c#m', root: notes.cs, quality: 'm', notes: [ notes.e, notes.gs ] },
  { name: 'dm', root: notes.d, quality: 'm', notes: [ notes.f, notes.a ] },
  { name: 'd#m', root: notes.ds, quality: 'm', notes: [ notes.fs, notes.as ] },
  { name: 'em', root: notes.e, quality: 'm', notes: [ notes.g, notes.b ] },
  { name: 'fm', root: notes.f, quality: 'm', notes: [ notes.gs, notes.c ] },
  { name: 'f#m', root: notes.fs, quality: 'm', notes: [ notes.a, notes.cs ] },
  { name: 'gm', root: notes.g, quality: 'm', notes: [ notes.as, notes.d ] },
  { name: 'g#m', root: notes.gs, quality: 'm', notes: [ notes.b, notes.ds ] },
  { name: 'a5', root: notes.a, quality: '5', notes: [ notes.cs ] },
  { name: 'a#5', root: notes.as, quality: '5', notes: [ notes.d ] },
  { name: 'b5', root: notes.b, quality: '5', notes: [ notes.ds ] },
  { name: 'c5', root: notes.c, quality: '5', notes: [ notes.e ] },
  { name: 'c#5', root: notes.cs, quality: '5', notes: [ notes.f ] },
  { name: 'd5', root: notes.d, quality: '5', notes: [ notes.fs ] },
  { name: 'd#5', root: notes.ds, quality: '5', notes: [ notes.g ] },
  { name: 'e5', root: notes.e, quality: '5', notes: [ notes.gs ] },
  { name: 'f5', root: notes.f, quality: '5', notes: [ notes.a ] },
  { name: 'f#5', root: notes.fs, quality: '5', notes: [ notes.as ] },
  { name: 'g5', root: notes.g, quality: '5', notes: [ notes.b ] },
  { name: 'g#5', root: notes.gs, quality: '5', notes: [ notes.c ] },
  { name: 'a6', root: notes.a, quality: '', notes: [ notes.cs, notes.e,  notes.fs ] },
  { name: 'a#6', root: notes.as, quality: '', notes: [ notes.d, notes.f,  notes.g ] },
  { name: 'b6', root: notes.b, quality: '', notes: [ notes.ds, notes.fs,  notes.gs ] },
  { name: 'c6', root: notes.c, quality: '', notes: [ notes.e, notes.g,  notes.a ] },
  { name: 'c#6', root: notes.cs, quality: '', notes: [ notes.f, notes.gs,  notes.as ] },
  { name: 'd6', root: notes.d, quality: '', notes: [ notes.fs, notes.a,  notes.b ] },
  { name: 'd#6', root: notes.ds, quality: '', notes: [ notes.g, notes.as,  notes.c ] },
  { name: 'e6', root: notes.e, quality: '', notes: [ notes.gs, notes.b,  notes.cs ] },
  { name: 'f6', root: notes.f, quality: '', notes: [ notes.a, notes.c,  notes.d ] },
  { name: 'f#6', root: notes.fs, quality: '', notes: [ notes.as, notes.cs,  notes.ds ] },
  { name: 'g6', root: notes.g, quality: '', notes: [ notes.b, notes.d,  notes.e ] },
  { name: 'g#6', root: notes.gs, quality: '', notes: [ notes.c, notes.ds,  notes.f ] },
  { name: 'am6', root: notes.a, quality: '', notes: [ notes.c, notes.e,  notes.fs ] },
  { name: 'a#m6', root: notes.as, quality: '', notes: [ notes.cs, notes.f,  notes.g ] },
  { name: 'bm6', root: notes.b, quality: '', notes: [ notes.d, notes.fs,  notes.gs ] },
  { name: 'cm6', root: notes.c, quality: '', notes: [ notes.ds, notes.g,  notes.a ] },
  { name: 'c#m6', root: notes.cs, quality: '', notes: [ notes.e, notes.gs,  notes.as ] },
  { name: 'dm6', root: notes.d, quality: '', notes: [ notes.f, notes.a,  notes.b ] },
  { name: 'd#m6', root: notes.ds, quality: '', notes: [ notes.fs, notes.as,  notes.c ] },
  { name: 'em6', root: notes.e, quality: '', notes: [ notes.g, notes.b,  notes.cs ] },
  { name: 'fm6', root: notes.f, quality: '', notes: [ notes.gs, notes.c,  notes.d ] },
  { name: 'f#m6', root: notes.fs, quality: '', notes: [ notes.a, notes.cs,  notes.ds ] },
  { name: 'gm6', root: notes.g, quality: '', notes: [ notes.as, notes.d,  notes.e ] },
  { name: 'g#m6', root: notes.gs, quality: '', notes: [ notes.b, notes.ds,  notes.f ] },
  { name: 'a7', root: notes.a, quality: '', notes: [ notes.cs, notes.e,  notes.g ] },
  { name: 'a#7', root: notes.as, quality: '', notes: [ notes.d, notes.f,  notes.gs ] },
  { name: 'b7', root: notes.b, quality: '', notes: [ notes.ds, notes.fs,  notes.a ] },
  { name: 'c7', root: notes.c, quality: '', notes: [ notes.e, notes.g,  notes.as ] },
  { name: 'c#7', root: notes.cs, quality: '', notes: [ notes.f, notes.gs,  notes.b ] },
  { name: 'd7', root: notes.d, quality: '', notes: [ notes.fs, notes.a,  notes.c ] },
  { name: 'd#7', root: notes.ds, quality: '', notes: [ notes.g, notes.as,  notes.cs ] },
  { name: 'e7', root: notes.e, quality: '', notes: [ notes.gs, notes.b,  notes.d ] },
  { name: 'f7', root: notes.f, quality: '', notes: [ notes.a, notes.c,  notes.ds ] },
  { name: 'f#7', root: notes.fs, quality: '', notes: [ notes.as, notes.cs,  notes.e ] },
  { name: 'g7', root: notes.g, quality: '', notes: [ notes.b, notes.d,  notes.f ] },
  { name: 'g#7', root: notes.gs, quality: '', notes: [ notes.c, notes.ds,  notes.fs ] },
  { name: 'am7', root: notes.a, quality: 'm', notes: [ notes.c, notes.e,  notes.g ] },
  { name: 'a#m7', root: notes.as, quality: 'm', notes: [ notes.cs, notes.f,  notes.gs ] },
  { name: 'bm7', root: notes.b, quality: 'm', notes: [ notes.d, notes.fs,  notes.a ] },
  { name: 'cm7', root: notes.c, quality: 'm', notes: [ notes.ds, notes.g,  notes.as ] },
  { name: 'c#m7', root: notes.cs, quality: 'm', notes: [ notes.e, notes.gs,  notes.b ] },
  { name: 'dm7', root: notes.d, quality: 'm', notes: [ notes.f, notes.a,  notes.c ] },
  { name: 'd#m7', root: notes.ds, quality: 'm', notes: [ notes.fs, notes.as,  notes.cs ] },
  { name: 'em7', root: notes.e, quality: 'm', notes: [ notes.g, notes.b,  notes.d ] },
  { name: 'fm7', root: notes.f, quality: 'm', notes: [ notes.gs, notes.c,  notes.ds ] },
  { name: 'f#m7', root: notes.fs, quality: 'm', notes: [ notes.a, notes.cs,  notes.e ] },
  { name: 'gm7', root: notes.g, quality: 'm', notes: [ notes.as, notes.d,  notes.f ] },
  { name: 'g#m7', root: notes.gs, quality: 'm', notes: [ notes.b, notes.ds,  notes.fs ] },
  { name: 'asus2', root: notes.a, quality: '', notes: [ notes.b, notes.e ] },
  { name: 'a#sus2', root: notes.as, quality: '', notes: [ notes.c, notes.f ] },
  { name: 'bsus2', root: notes.b, quality: '', notes: [ notes.cs, notes.fs ] },
  { name: 'csus2', root: notes.c, quality: '', notes: [ notes.d, notes.g ] },
  { name: 'c#sus2', root: notes.cs, quality: '', notes: [ notes.ds, notes.gs ] },
  { name: 'dsus2', root: notes.d, quality: '', notes: [ notes.e, notes.a ] },
  { name: 'd#sus2', root: notes.ds, quality: '', notes: [ notes.f, notes.as ] },
  { name: 'esus2', root: notes.e, quality: '', notes: [ notes.fs, notes.b ] },
  { name: 'fsus2', root: notes.f, quality: '', notes: [ notes.g, notes.c ] },
  { name: 'f#sus2', root: notes.fs, quality: '', notes: [ notes.gs, notes.cs ] },
  { name: 'gsus2', root: notes.g, quality: '', notes: [ notes.a, notes.d ] },
  { name: 'g#sus2', root: notes.gs, quality: '', notes: [ notes.as, notes.ds ] },
  { name: 'asus4', root: notes.a, quality: '', notes: [ notes.d, notes.e ] },
  { name: 'a#sus4', root: notes.as, quality: '', notes: [ notes.ds, notes.f ] },
  { name: 'bsus4', root: notes.b, quality: '', notes: [ notes.e, notes.fs ] },
  { name: 'csus4', root: notes.c, quality: '', notes: [ notes.f, notes.g ] },
  { name: 'c#sus4', root: notes.cs, quality: '', notes: [ notes.fs, notes.gs ] },
  { name: 'dsus4', root: notes.d, quality: '', notes: [ notes.g, notes.a ] },
  { name: 'd#sus4', root: notes.ds, quality: '', notes: [ notes.gs, notes.as ] },
  { name: 'esus4', root: notes.e, quality: '', notes: [ notes.a, notes.b ] },
  { name: 'fsus4', root: notes.f, quality: '', notes: [ notes.as, notes.c ] },
  { name: 'f#sus4', root: notes.fs, quality: '', notes: [ notes.b, notes.cs ] },
  { name: 'gsus4', root: notes.g, quality: '', notes: [ notes.c, notes.d ] },
  { name: 'g#sus4', root: notes.gs, quality: '', notes: [ notes.cs, notes.ds ] },
  { name: 'adim', root: notes.a, quality: '', notes: [ notes.c, notes.ds ] },
  { name: 'a#dim', root: notes.as, quality: '', notes: [ notes.cs, notes.e ] },
  { name: 'bdim', root: notes.b, quality: '', notes: [ notes.d, notes.f ] },
  { name: 'cdim', root: notes.c, quality: '', notes: [ notes.ds, notes.fs ] },
  { name: 'c#dim', root: notes.cs, quality: '', notes: [ notes.e, notes.g ] },
  { name: 'ddim', root: notes.d, quality: '', notes: [ notes.f, notes.gs ] },
  { name: 'd#dim', root: notes.ds, quality: '', notes: [ notes.fs, notes.a ] },
  { name: 'edim', root: notes.e, quality: '', notes: [ notes.g, notes.as ] },
  { name: 'fdim', root: notes.f, quality: '', notes: [ notes.gs, notes.b ] },
  { name: 'f#dim', root: notes.fs, quality: '', notes: [ notes.a, notes.c ] },
  { name: 'gdim', root: notes.g, quality: '', notes: [ notes.as, notes.cs ] },
  { name: 'g#dim', root: notes.gs, quality: '', notes: [ notes.b, notes.d ] },
  { name: 'aaug', root: notes.a, quality: '', notes: [ notes.cs, notes.f ] },
  { name: 'a#aug', root: notes.as, quality: '', notes: [ notes.d, notes.fs ] },
  { name: 'baug', root: notes.b, quality: '', notes: [ notes.ds, notes.g ] },
  { name: 'caug', root: notes.c, quality: '', notes: [ notes.e, notes.gs ] },
  { name: 'c#aug', root: notes.cs, quality: '', notes: [ notes.f, notes.a ] },
  { name: 'daug', root: notes.d, quality: '', notes: [ notes.fs, notes.as ] },
  { name: 'd#aug', root: notes.ds, quality: '', notes: [ notes.g, notes.b ] },
  { name: 'eaug', root: notes.e, quality: '', notes: [ notes.gs, notes.c ] },
  { name: 'faug', root: notes.f, quality: '', notes: [ notes.a, notes.cs ] },
  { name: 'f#aug', root: notes.fs, quality: '', notes: [ notes.as, notes.d ] },
  { name: 'gaug', root: notes.g, quality: '', notes: [ notes.b, notes.ds ] },
  { name: 'g#aug', root: notes.gs, quality: '', notes: [ notes.c, notes.e ] },
];

@Component({
  selector: 'app-chord',
  template: `
    <button (click)="playChord()">{{chordString}}</button>
  `,
  styles: [
  ]
})
export class ChordComponent implements OnInit {
  @Input() chordString;
  chord;

  constructor() { }

  ngOnInit(): void {
    this.chord = chords.find(x => x.name == this.chordString.toLowerCase());
    console.log(this.chord);
  }

  playChord(): void {
    this.chord.notes.forEach(x => {
      x.play();
    })
  }

}
