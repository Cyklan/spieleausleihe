import { Game } from "./types";

export const getAllAttributes = (games: Game[]) => {
  const attributes = new Set<string>();

  for (let i = 0; i < games.length; i++) {
    const game = games[i];
    const attrs = game.attribute?.split(",");
    attrs?.forEach((attr) => attributes.add(attr));
  }

  return Array.from(attributes);
};
