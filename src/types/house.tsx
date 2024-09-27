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
  Baños?: number;
  Dormitorios?: number;
  Salon?: number;
  Cocina?: number;
  Balcones?: number;
  Servicio?: number;
  [key: string]: number | undefined;
}

export interface Amentities{
  heating?: boolean;
  ac?: boolean;
  portero?: boolean;
  trastero?: boolean;
  elevator?: boolean;
  laundry?: boolean;
  parking?: boolean;
  rooftop?: boolean;
}

export interface House {
  title: string;
  url: string;
  description: string;
  buyOrRent: boolean;
  reformado: boolean;
  photos: Photo[];
  precio: number;
  totalArea: number;
  rooms: Rooms;
  barrioRef: Barrio;
  amentetiesRef: Amentities;
  ibi: number;
  maintenanceCostmMnthly: number;
}


