export interface Song {
  id?: string;
  title: string;
  artist: string;
  genres?: string[];
  chords?: string[];
  lyrics: string;
}