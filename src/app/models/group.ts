export interface Group {
  id?: string;
  ownerId: string;
  name: string;
  users?: string[];
}