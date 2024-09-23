interface Photo {
  fields: {
    file: {
      url: string;
    };
  };
}

export interface Barrio {
  name: string;
  rating: number;
  description: string;
}

export interface Rooms {
  Bedroom?: number;
  Kitchen?: number;
  Laundry?: number;
  Bathroom?: number;
  Servicio?: number;
  [key: string]: number | undefined; // Add this line
}

export interface House {
  title: string;
  url: string;
  description: string;
  buyOrRent: boolean;
  photos: Photo[];
  precio: number;
  totalArea: number;
  rooms: Rooms;
  barrioRef: Barrio;
}