import { Rooms } from '@/types/house';

export const getTotalRooms = (rooms: Rooms) => {
    if (!rooms) {
        return 0;
    }

    return Object.entries(rooms)
        .filter(([key]) => key === 'Baños' || key === 'Dormitorios')
        .reduce((total, [, count]) => total + (count || 0), 0);
};