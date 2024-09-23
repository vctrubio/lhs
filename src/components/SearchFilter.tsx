'use client'
import React, { useEffect, useState } from "react"
import { House } from '@/types/house';
import { PropertyCard } from '@/components/Property'
import LeftBar from "@/components/CredBar"
import { getTotalRooms } from "@/lib/utils";

export const SNF = ({ entries }: { entries: House[] }) => {
    const [filteredHouses, setFilteredHouses] = useState<House[]>(entries);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [sortBy, setSortBy] = useState<'precio' | 'totalArea' | 'totalRooms'>('precio');
    const [filter, setFilter] = useState<'rent' | 'buy' | 'all'>('all');
    const allBarrios = Array.from(new Set(entries.map(entry => entry.barrioRef.name))); // Get unique barrios
    const [selectedBarrios, setSelectedBarrios] = useState<string[]>(allBarrios); // Barrios selected by default

    // Count houses per barrio
    const houseCountsByBarrio = allBarrios.reduce((acc, barrio) => {
        acc[barrio] = entries.filter(entry => entry.barrioRef.name === barrio).length;
        return acc;
    }, {});
    // Barrios

    // Reset the filters and sorting
    const handleReset = () => {
        setSearchQuery(''); // Reset search query
        setSortOrder('asc'); // Reset sort order
        setSortBy('precio'); // Reset sort by price
        setFilter('all'); // Reset to show all
        setSelectedBarrios(allBarrios); // Reset barrios to all selected
    };

    // Filter and sort logic
    useEffect(() => {
        let updatedHouses = [...entries];

        if (filter !== 'all') {
            updatedHouses = updatedHouses.filter(house =>
                filter === 'buy' ? house.buyOrRent : !house.buyOrRent
            );
        }

        if (searchQuery) {
            updatedHouses = updatedHouses.filter(house =>
                house.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Filter by selected barrios
        updatedHouses = updatedHouses.filter(house =>
            selectedBarrios.includes(house.barrioRef.name)
        );

        // Sorting logic by price, total area, or total rooms
        updatedHouses.sort((a, b) => {
            if (sortBy === 'totalRooms') {
                const totalRoomsA = getTotalRooms(a.rooms);
                const totalRoomsB = getTotalRooms(b.rooms);
                return sortOrder === 'asc' ? totalRoomsA - totalRoomsB : totalRoomsB - totalRoomsA;
            }
            return sortOrder === 'asc' ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy];
        });

        setFilteredHouses(updatedHouses);
    }, [searchQuery, sortOrder, filter, sortBy, selectedBarrios, entries]);

    return (
        <>
            <LeftBar
                setSearchQuery={setSearchQuery}
                setSortOrder={setSortOrder}
                setSortBy={setSortBy}
                setFilter={setFilter}
                handleReset={handleReset}
                allBarrios={allBarrios}
                selectedBarrios={selectedBarrios}
                setSelectedBarrios={setSelectedBarrios}
                searchQuery={searchQuery}
                filter={filter}
                sortBy={sortBy}
                sortOrder={sortOrder}
                houseCountsByBarrio={houseCountsByBarrio} // Pass the house counts
            />
            <div className="property-container">
                {filteredHouses.length === 0 ? (
                    <div className="no-results">
                        <p>No results found.</p>
                        <button onClick={handleReset}>Reset Filters</button>
                    </div>
                ) : (
                    filteredHouses.map((entry: House) => (
                        <PropertyCard house={entry} key={entry.url} />
                    ))
                )}
            </div>
        </>
    );
}


/**todo
 * when search is active or sort by other than price, show proeprt-desc by property-desc.highlight in css state
 */