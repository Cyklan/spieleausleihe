"use client"

import { FC, useState } from "react"
import { Game } from "./types"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerFooter,
} from "@/components/ui/drawer"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { GameCard } from "./components/GameCard"

export const Content: FC<{ games: Game[]; attributes: string[] }> = ({
  games,
  attributes,
}) => {
  const [query, setQuery] = useState("")
  const [minPlayers, setMinPlayers] = useState("")
  const [maxPlayers, setMaxPlayers] = useState("")
  const [minTime, setMinTime] = useState("")
  const [maxTime, setMaxTime] = useState("")
  const [selectedAttribute, setSelectedAttribute] = useState("all")
  const [open, setOpen] = useState(false)
  
  // Active filters that are currently applied
  const [activeFilters, setActiveFilters] = useState({
    minPlayers: "",
    maxPlayers: "",
    minTime: "",
    maxTime: "",
    attribute: "all",
  })

  const filteredGames = games
    .filter((game) =>
      game.name.toLowerCase().includes(query.trim().toLowerCase())
    )
    .filter((game) => {
      if (activeFilters.minPlayers && game.min_spieler < parseInt(activeFilters.minPlayers)) return false
      if (activeFilters.maxPlayers && game.max_spieler > parseInt(activeFilters.maxPlayers)) return false
      if (activeFilters.minTime && game.min_dauer < parseInt(activeFilters.minTime)) return false
      if (activeFilters.maxTime && game.max_dauer > parseInt(activeFilters.maxTime)) return false
      if (activeFilters.attribute !== "all" && game.attribute) {
        const gameAttributes = game.attribute.split(",")
        if (!gameAttributes.includes(activeFilters.attribute)) return false
      }
      return true
    })
    .sort((a, b) => a.name.localeCompare(b.name))

  const handleApplyFilters = () => {
    setActiveFilters({
      minPlayers,
      maxPlayers,
      minTime,
      maxTime,
      attribute: selectedAttribute,
    })
    setOpen(false)
  }

  const handleClearFilters = () => {
    setActiveFilters({
      minPlayers: "",
      maxPlayers: "",
      minTime: "",
      maxTime: "",
      attribute: "all",
    })
    setMinPlayers("")
    setMaxPlayers("")
    setMinTime("")
    setMaxTime("")
    setSelectedAttribute("all")
  }

  const hasActiveFilters = Object.values(activeFilters).some(value => 
    value !== "" && value !== "all"
  )

  return (
    <div className="flex flex-col h-screen">
      <div className="px-4 sticky top-0 bg-background">
        <Input
          placeholder="Suche"
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
          className="my-4"
        />
      </div>
      <div className="flex-1 overflow-y-auto px-4 pb-48">
        <div className="space-y-4">
          {filteredGames.map((game) => (
            <GameCard key={game.barcode} game={game} />
          ))}
        </div>
      </div>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button variant="outline" className="fixed bottom-8 right-8 shadow-lg">
            Filter
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Filter</DrawerTitle>
          </DrawerHeader>
          <div className="p-4 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Spieler</label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Min."
                  value={minPlayers}
                  onChange={(e) => setMinPlayers(e.target.value)}
                  className="flex-1"
                />
                <Input
                  type="number"
                  placeholder="Max."
                  value={maxPlayers}
                  onChange={(e) => setMaxPlayers(e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Spielzeit (Min.)</label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Min."
                  value={minTime}
                  onChange={(e) => setMinTime(e.target.value)}
                  className="flex-1"
                />
                <Input
                  type="number"
                  placeholder="Max."
                  value={maxTime}
                  onChange={(e) => setMaxTime(e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Attribut</label>
              <Select value={selectedAttribute} onValueChange={setSelectedAttribute}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Attribut auswählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle</SelectItem>
                  {attributes.map((attribute) => (
                    <SelectItem key={attribute} value={attribute}>
                      {attribute}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DrawerFooter className="flex flex-col gap-2">
            <Button
              variant="outline"
              onClick={handleClearFilters}
              disabled={!hasActiveFilters}
            >
              Filter löschen
            </Button>
            <Button onClick={handleApplyFilters}>
              Filter anwenden
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
