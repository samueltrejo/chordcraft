// { name: 'a', root: this.notes.a, quality: '', notes: [ this.notes.cs, this.notes.e ] },

export interface Chord {
  name: string;
  root: any;
  quality: string;
  notes: any[];
}