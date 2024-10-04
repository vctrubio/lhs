'use client'
import React, { useEffect, useState } from "react";
import { PropertyCard } from '@/components/Property';
import LeftBar from "@/components/CredBar";
import { Property } from "@/types/property";
import { getRooms } from "@/lib/utils";
import { Logo } from "@/lib/utils";

export const SNF = ({ entries }: { entries: Property[] }) => {
    const [filteredHouses, setFilteredHouses] = useState<Property[]>(entries);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const [sortBy, setSortBy] = useState<'precio' | 'totalArea' | 'totalRooms'>('precio');
    const [filter, setFilter] = useState<'rent' | 'buy' | 'all'>('all');
    const [reformadoFilter, setReformadoFilter] = useState<'all' | 'reformado' | 'sinReformar'>('all');
    const allBarrios = Array.from(new Set(entries.map(entry => entry.barrioRef?.name)));
    const [selectedBarrios, setSelectedBarrios] = useState<string[]>(allBarrios);
    const [cssStateHover, setCssStateHover] = useState(false);
    const [cssUniqueBoy, setUniqueBoy] = useState(false);
    // Count houses per barrio
    const houseCountsByBarrio = allBarrios.reduce((acc, barrio) => {
        acc[barrio] = entries.filter(entry => entry.barrioRef?.name === barrio).length;
        return acc;
    }, {});

    // Reset the filters and sorting
    const handleReset = () => {
        setSearchQuery(''); // Reset search query
        setSortOrder('desc'); // Reset sort order
        setSortBy('precio'); // Reset sort by price
        setFilter('all'); // Reset to show all
        setSelectedBarrios(allBarrios); // Reset barrios to all selected
        setReformadoFilter('all'); // Reset reformado filter to "All"
    };

    useEffect(() => {
        if (searchQuery.length > 0 || sortBy !== 'precio' || reformadoFilter !== 'all')
            setCssStateHover(true);
        else
            setCssStateHover(false);
    }, [searchQuery, sortBy, reformadoFilter])

    useEffect(() => {
        if (filteredHouses.length === 1)
            setUniqueBoy(true);
        else
            setUniqueBoy(false);
    }, [filteredHouses])

    // Filter and sort logic
    useEffect(() => {
        let updatedHouses = [...entries];

        // Filter by rent/buy
        if (filter !== 'all') {
            updatedHouses = updatedHouses.filter(house =>
                filter === 'buy' ? house.buyOrRent : !house.buyOrRent
            );
        }

        // Filter by search query
        if (searchQuery) {
            updatedHouses = updatedHouses.filter(house =>
                house.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Filter by selected barrios
        updatedHouses = updatedHouses.filter(house =>
            selectedBarrios.includes(house.barrioRef?.name)
        );

        // Filter by reformado
        if (reformadoFilter === 'reformado') {
            updatedHouses = updatedHouses.filter(house => house.reformado === true);
        } else if (reformadoFilter === 'sinReformar') {
            updatedHouses = updatedHouses.filter(house => house.reformado === false);
        }

        updatedHouses.sort((a, b) => {
            if (sortBy === 'totalRooms') {
                const totalRoomsA = getRooms({ property: a });
                const totalRoomsB = getRooms({ property: b });
                return sortOrder === 'asc' ? totalRoomsA - totalRoomsB : totalRoomsB - totalRoomsA;
            }
            return sortOrder === 'asc' ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy];
        });

        setFilteredHouses(updatedHouses);
    }, [searchQuery, sortOrder, filter, sortBy, selectedBarrios, reformadoFilter, entries]);

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
                reformadoFilter={reformadoFilter} // Pass reformado filter
                setReformadoFilter={setReformadoFilter} // Function to update the reformado filter
            />
            <div className="property-container" last-man-standing={cssUniqueBoy ? 'on' : ''}>
                {filteredHouses.length === 0 ? (
                    <div className="flex justify-center flex-col m-auto">
                        <Logo />
                        <p className="text-center">No encontramos lo que buscas</p>
                        <button onClick={handleReset} className="border border-white rounded-2xl">Reset Filters</button>
                    </div>
                ) : (
                    filteredHouses.map((entry: Property) => (
                        <PropertyCard property={entry} key={entry.title} cssStateHover={cssStateHover} />
                    ))
                )}
            </div>
        </>
    );
};
