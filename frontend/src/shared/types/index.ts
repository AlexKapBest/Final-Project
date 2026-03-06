export type Specialty = {
  specialty: string
  score: string
}

export type University = {
  university: string
  url: string
  data: Specialty[]
  updatedAt: string
}

export type FavoriteItem = {
  universityName: string
  specialty: string
  score: string
}
