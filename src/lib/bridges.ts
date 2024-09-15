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