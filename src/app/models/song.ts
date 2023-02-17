export interface Song {
  id?: string;
  ownerId: string;
  title: string;
  artist: string;
  genres?: string[];
  chords?: string[];
  lyrics: string;
  sharedUsers?: string[];
}