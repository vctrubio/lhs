import { Rooms } from '@/types/house';

export const getTotalRooms = (rooms: Rooms) => {
    if (!rooms) {
        return 0;
    }

    return Object.entries(rooms)
        .filter(([key]) => key === 'Baños' || key === 'Dormitorios')
        .reduce((total, [, count]) => total + (count || 0), 0);
};

export function ImageToUrl(entry: any): string {
    const url = entry.fields.file.url.startsWith('http') ? entry.fields.file.url : `https:${entry.fields.file.url}`;
    return url;
}

export function extractImageUrls(entries: any[]): string[] {
    return entries.map(entry => ImageToUrl(entry));
}