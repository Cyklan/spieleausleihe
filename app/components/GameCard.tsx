import { FC } from "react"
import { Game } from "../types"
import { cn } from "@/lib/utils"

interface GameCardProps {
  game: Game
}

export const GameCard: FC<GameCardProps> = ({ game }) => {
  const isAvailable = game.menge - game.ausgeliehen > 0

  return (
    <div className="p-4 border rounded-lg space-y-2">
      <div className="flex justify-between items-start">
        <h3 className="font-medium">{game.name}</h3>
        <span
          className={cn(
            "text-sm px-2 py-1 rounded-full",
            isAvailable
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          )}
        >
          {isAvailable ? "Verfügbar" : "Ausgeliehen"}
        </span>
      </div>
      <div className="text-sm text-muted-foreground space-y-1">
        <div>
          {game.min_spieler} - {game.max_spieler} Spieler
        </div>
        <div>
          {game.min_dauer === game.max_dauer
            ? `${game.min_dauer} Min.`
            : `${game.min_dauer} - ${game.max_dauer} Min.`}
        </div>
      </div>
    </div>
  )
} 