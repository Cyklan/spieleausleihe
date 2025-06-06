import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Bad Nauheim Spielt Spieleausleihe",
  description: "Durchsuchen Sie unsere Spieleausleihe und finden Sie das perfekte Spiel.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={"antialiased"}
      >
        {children}
      </body>
    </html>
  )
}
