interface Photo {
    fields: {
        file: {
            url: string;
        };
    };
}

interface PropiedadCharacteristics {
    title: string;
    tipoDePropiedad: string;
    dormitorios: number;
    banos: number;
    balcones: number;
    metrosCuadrados: number; //totalArea
}

interface PropiedadHabitacion {
    title: string;
    propiedadDe: string;
    description: string;
    photos: string[]; // Array of URLs or image file paths
}

interface Barrio {
    name: string;
    rating: number;
    description: string;
    longDescription: string;
}

interface Amentities {
    title: string;
    AC: boolean;
    Heating: boolean;
    Rooftop: boolean;
    Furnished: boolean;
    Portero: boolean;
    Trastero: boolean;
    Elevator: boolean;
    OpenKitchen: boolean;
    Laundry: boolean;
    Parking: boolean;
}

export interface Property {
    title: string;
    description: string;
    buyOrRent: boolean;
    reformado: boolean;
    precio: number;
    precioIbi: number;
    precioComunidad: number;
    
    plano_url: string;
    cover_url: string[];
    photos_rooms_url: string[];

    barrioRef: Barrio;
    amentitiesRef: Amentities;
    charRef: PropiedadCharacteristics;
    roomsRef: PropiedadHabitacion[];
    updatedAt: string;
    canva_id: string | null;
}

export interface PropertyCardProps {
    property: Property;
}


export function showRenderRooms({ property}: {property : Property})
{
    return property.roomsRef.map((room, index) => {
        return (
            <div key={index} className="flex flex-col items-center">
                <img src={room.photos[0]} alt={room.title} className="w-64 h-64 object-cover rounded-lg" />
                <h3 className="text-xl font-semibold">{room.title}</h3>
                <p className="text-center">{room.description}</p>
            </div>
        );
    });
}

export function showRenderAmentities({ property}: {property : Property})
{
    return (
        <div className="grid grid-cols-2 gap-4">
            {Object.entries(property.amentitiesRef).map(([amentity, value]) => (
                <div key={amentity} className="flex items-center">
                    <span className="text-lg font-semibold text-gray-700">
                        {amentity}:
                    </span>
                    <span className="ml-2 text-gray-600">{value ? 'Yes' : 'No'}</span>
                </div>
            ))}
        </div>
    );
}

export function getRooms({property}: {property: Property})
{
    let total: number;
    total = 23;

    //rooms = baño or habitacion
    return total
}
