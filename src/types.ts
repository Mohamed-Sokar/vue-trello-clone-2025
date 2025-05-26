interface Card {
  id: number
  title: string
  description: string
}

interface List {
  id: number
  title: string
  cards: Card[]
}

export type { Card, List }
