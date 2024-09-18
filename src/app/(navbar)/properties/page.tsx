import React from 'react';
import { fetchHouseEntries } from '@/lib/bridges'
import { House } from '@/types/house';
import { CardHouse } from '@/components/Cards';
import { NavBarUnder } from '@/components/SearchBar';
import { LeftBar} from '@/components/CredBar';

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
            <NavBarUnder />
            <div className='card-homes-container'>
                {entries.map((entry: House) => (
                    <CardHouse house={entry} key={entry.url} />
                ))}
            </div>
            <LeftBar/>
        </>
    )
}

export default HomePage;