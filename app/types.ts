export type Game = {
  barcode: string;
  name: string;
  menge: number;
  anmerkung: string | null;
  min_alter: number;
  min_spieler: number;
  max_spieler: number;
  min_dauer: number;
  max_dauer: number;
  verlag: string;
  ausgeliehen: number;
  attribute?: string;
  ausgeliehen_gesamt: number;
};
