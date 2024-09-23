import React from 'react';
import { fetchHouseEntries } from '@/lib/bridges'
import { House } from '@/types/house';
import {SNF} from '@/components/SearchFilter'

const Objective = () => {
    return (
        <div>
            <div>
                <ul>Get flats from CRM</ul>
                <li>Search box, filter box</li>
                <li>view by area, view by cards</li>
                <li>flat-id-page</li>
            </div>
            <div>
                carecteristicas de la casa
                <li>metros cuadrados </li>
                <li>habitaciones - baño, salon, suite, dormitorios</li>
                <li>description opional de habitacion</li>
                <li>terraza</li>
                <li>servicio de la casa [tags]</li>
                <li>DESC Y TITULO</li>
                <li>precio</li>
            </div>
        </div>
    )
}

const HomePage = async () => {
    const entries: House[] = await fetchHouseEntries();
    console.log("🚀 ~ HomePage ~ entries:", entries)

    return (
        <>
            <SNF entries={entries}/>
        </>
    )
}

export default HomePage;