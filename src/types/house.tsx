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
}

export interface House {
  title: string;
  url: string;
  description: string;
  buyOrRent: boolean; //true is RENT
  photos: Photo[];
  precio: number;
  totalArea: number;
  rooms: Rooms;
  barrioRef: Barrio;
}