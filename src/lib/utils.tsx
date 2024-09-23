import { Rooms } from '@/types/house';

export const getTotalRooms = (rooms: Rooms) => {
    return Object.values(rooms).reduce((total, count) => total + (count || 0), 0);
};