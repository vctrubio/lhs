import { createClient, Entry } from 'contentful';
import { House, Barrio, Amentities } from '@/types/house';


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
    const { title, ...amentetiesFields } = amentetiesRef?.fields || {};

    return {
        ...fields,
        barrioRef: barrioRef ? (barrioRef as BarrioRef).fields : null,
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
