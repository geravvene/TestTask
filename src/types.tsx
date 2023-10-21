export type TAuthor = {
  id: number
  name: string
};
export type TLocation = {
  id: number
  location: string
};

export type TNewLocation = {
  id: number
  name: string
};

export type TPainting = {
  id: number
  authorId: number
  created: string
  imageUrl: string
  locationId: number
  name: string
};

export type TParams = {
  _page: string
  name_like: string
  authorId: string
  locationId: string
  created_gte: string
  created_lte: string
};

export type TDescriptionLine = {
  id: number
  property: string
  value: string
};

export interface IPaintingList {
  authors: TAuthor[]
  locations: TNewLocation[]
}
