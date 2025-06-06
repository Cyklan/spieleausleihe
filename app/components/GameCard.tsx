import { FC } from "react"
import { Game } from "../types"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface GameCardProps {
  game: Game
}

export const GameCard: FC<GameCardProps> = ({ game }) => {
  const isAvailable = game.menge - game.ausgeliehen > 0
  const attributes = game.attribute?.split(",") || []

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
          {game.min_spieler === game.max_spieler
            ? `${game.min_spieler} Spieler`
            : `${game.min_spieler} - ${game.max_spieler} Spieler`}
        </div>
        <div>
          {game.min_dauer === game.max_dauer
            ? `${game.min_dauer} Min.`
            : `${game.min_dauer} - ${game.max_dauer} Min.`}
        </div>
        {attributes.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {attributes.map((attr) => (
              <Badge key={attr} variant="secondary" className="text-xs">
                {attr}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 