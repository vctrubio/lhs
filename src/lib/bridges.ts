import { createClient, Entry } from 'contentful';
import { House, Barrio } from '@/types/house';


const client = createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID as string,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN as string,
});


interface BarrioRef {
    metadata: object;
    sys: object;
    fields: Barrio; //what we are interested in
}

export async function fetchHouseEntries(): Promise<House[]> {
    console.log('init fetching');
    const entries = await client.getEntries();

    const filteredEntries = entries.items.filter((entry: Entry<any>) => {
        return entry.sys.contentType.sys.id === 'house';
    });

    // Extract barrioRef.fields
    return filteredEntries.map((entry: Entry<any>) => {
        const { barrioRef, ...fields } = entry.fields;
        return {
            ...fields,
            barrioRef: barrioRef ? (barrioRef as BarrioRef).fields : null,
        } as House;
    });
}

export async function fetchHouseByID(url: string): Promise<House | null> {
    console.log(`Fetching house with URL: ${url}`);

    try {
        const entries = await client.getEntries();

        // Filter the entries to find the one that matches the given URL
        const filteredEntry = entries.items.find((entry: Entry<any>) => {
            return entry.sys.contentType.sys.id === 'house' && entry.fields.url === url;
        });

        if (!filteredEntry) {
            console.log(`No house found for URL: ${url}`);
            return null; // Return null if no house matches the given URL
        }

        // Extract barrioRef.fields if it's available
        const { barrioRef, ...fields } = filteredEntry.fields;

        return {
            ...fields,
            barrioRef: barrioRef ? (barrioRef as BarrioRef).fields : null,
        } as House;
    } catch (error) {
        console.error('Error fetching house by ID:', error);
        return null;
    }
}