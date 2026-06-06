export interface CatalogAuthor {
  id: number;
  name: string;
  specialty: string;
}

export interface CatalogBook {
  id: number;
  authorId: number;
  title: string;
  year: number;
}

export interface CatalogBookViewModel {
  authorName: string;
  id: number;
  title: string;
  year: number;
}

