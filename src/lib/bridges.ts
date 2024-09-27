import { createClient, Entry } from 'contentful';
import { House, Barrio, Amentities } from '@/types/house';
import { Property } from '@/types/property';


const client = createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID as string,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN as string,
});


interface BarrioRef {
    metadata: object;
    sys: object;
    fields: Barrio; //what we are interested in
}

function transformHouseEntry(entry: Entry<any>): House {
    const { barrioRef, amentetiesRef, ...fields } = entry.fields;
    const { title, ...amentetiesFields } = (amentetiesRef as { fields: any })?.fields || {};

    return {
        ...fields,
        barrioRef: barrioRef ? (barrioRef as { fields: any }).fields : null,
        amentetiesRef: amentetiesRef ? amentetiesFields : null,
    } as House;
}

export async function fetchHouseEntries(): Promise<House[]> {
    const entries = await client.getEntries();

    const filteredEntries = entries.items.filter((entry: Entry<any>) => {
        return entry.sys.contentType.sys.id === 'house';
    });

    return filteredEntries.map(transformHouseEntry);
}

export async function fetchHouseByID(url: string): Promise<House | null> {
    try {
        const entries = await client.getEntries();

        const filteredEntry = entries.items.find((entry: Entry<any>) => {
            return entry.sys.contentType.sys.id === 'house' && entry.fields.url === url;
        });

        if (!filteredEntry) {
            console.log(`No house found for URL: ${url}`);
            return null;
        }

        return transformHouseEntry(filteredEntry);
    } catch (error) {
        console.error('Error fetching house by ID:', error);
        return null;
    }
}


function parsePropertyFromContentful({ entry }): Property {

    function ImageToUrl(entry: any): string {
        const url = entry.fields.file.url.startsWith('http') ? entry.fields.file.url : `https:${entry.fields.file.url}`;
        return url;
    }

    function extractImageUrls(entries: any[]): string[] {
        return entries.map(entry => ImageToUrl(entry));
    }

    function getRoomPhotoUrl(entries: any[]): string[] {
        const urls = entries.map(entry => {
            const photos = entry.fields.photos
            const it = photos ? extractImageUrls(photos) : []
            return it
        }
        )
        return urls.flat()
    }


    const updatedAt = entry.sys.updatedAt
    const { barrioRef, amentetiesRef, characteristics, habitacionesPaginas, ibi, maintenanceCostmMnthly, photos, plano, title, description, buyOrRent, reformado, precio } = entry.fields;

    return {
        title: title,
        description: description,
        buyOrRent: buyOrRent,
        reformado: reformado,
        precio: precio,
        precioIbi: ibi ? ibi : 0,
        precioComunidad: maintenanceCostmMnthly ? maintenanceCostmMnthly : 0,
        plano_url: plano ? ImageToUrl(plano) : null,
        cover_url: photos ? extractImageUrls(photos) : null,
        barrioRef: barrioRef ? barrioRef.fields : null,
        amentitiesRef: amentetiesRef ? amentetiesRef.fields : null,
        charRef: characteristics ? characteristics.fields : null,
        roomsRef: habitacionesPaginas ? habitacionesPaginas.map(h => h.fields) : null,
        photos_rooms_url: habitacionesPaginas ? getRoomPhotoUrl(habitacionesPaginas) : null,
        updatedAt: updatedAt,
        canva_id: null,
    } as Property;
}

function parseBarrioFromContentful({ entry }): Barrio {
    const { name, rating, description, location } = entry.fields;

    return {
        name: name,
        rating: rating,
        description: description,
        location: location
    } as Barrio;
}

export async function fetchEntriesContentful(): Promise<{ properties: Property[], barrios: Barrio[] }> {
    const entries = await client.getEntries();

    const barrios: Barrio[] = [];
    const properties: Property[] = [];

    entries.items.map((entry: Entry<any>) => {
        if (entry.sys.contentType.sys.id === 'barrio') {
            barrios.push(parseBarrioFromContentful({ entry }))
        }
        if (entry.sys.contentType.sys.id === 'propiedad') {
            properties.push(parsePropertyFromContentful({ entry }))
        }
    });

    return { properties, barrios }

}