import { tryCatch } from "@/lib/tryCatch";
import mysql from "mysql2/promise";
import { Game } from "./types";
import { getAllAttributes } from "./getAllAttribute";
import { Chivo } from "next/font/google";
import { cn } from "@/lib/utils";
import { Content } from "./content";

const chivo = Chivo({
  subsets: ["latin"],
});

async function getGames(): Promise<Game[]> {
  const connection = await mysql.createConnection({
    host: "167.235.63.18",
    port: parseInt(process.env.DB_PORT || "3306"),
    user: "bnspielt",
    database: "afw",
    password: "badnauheimspielt2024",
  });

  const query = connection.query(
    `SELECT spiel.*, (SELECT COUNT(*) FROM ausleihung ausleihung WHERE ausleihung.spiel = spiel.barcode AND ausleihung.ist_ausgeliehen) ausgeliehen, (SELECT GROUP_CONCAT(attribut) FROM spiel_attribut spiel_attribut WHERE spiel_attribut.barcode = spiel.barcode) attribute, (SELECT COUNT(*) FROM ausleihung ausleihung WHERE ausleihung.spiel = spiel.barcode) ausgeliehen_gesamt FROM spiel spiel`
  );

  const [data, error] = await tryCatch(query);

  if (error) {
    console.error(error);
    return [];
  }

  const [results] = data;

  return results as Game[];
}

export default async function Home() {
  const games = await getGames();
  const attributes = getAllAttributes(games);

  return (
    <div
      className={cn(
        "w-screen h-[100svh] max-h-[100svh] overflow-hidden flex flex-col",
        chivo.className
      )}
    >
      <div className="text-center mt-4 w-full text-3xl font-bold">
        Spieleausleihe
      </div>
      <div className="flex-1 min-h-0">
        <Content attributes={attributes} games={games} />
      </div>
    </div>
  );
}
