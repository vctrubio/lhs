'use client'
import React, { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { TigerEye } from '@/app/page';


interface LhsTvBox {
    title: string;
    content: string;
}

const lhsTitle: LhsTvBox = {
    title: 'LHS',
    // content: 'Concept of living -- Looking for the best deals in Madrid -- With love and care -- sometimes we cant  -- understand the rules -- but this is the last -- time i will shoot'
    content: 'Concept of living -- Looking for the best deals in Madrid'
}

export const LHSCard = ({ tv = lhsTitle }: LhsTvBox) => {

    const SearchBox = () => {
        const [inputWidth, setInputWidth] = useState(22); // Minimum width of 18px

        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const textLength = e.target.value.length;
            const newWidth = Math.max(24, textLength * 9); // Adjust the width based on character length
            setInputWidth(Math.min(newWidth, 318)); // Set a maximum width of 400px
        };

        return (
            <div className="i-search">
                <div className="i-got-it">
                    <FontAwesomeIcon icon={faSearch} style={{ fontSize: '24px', color: 'black', opacity: '0.6' }} />
                    <input
                        type="text"
                        style={{ width: `${inputWidth}px` }}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="i-got-you">
                    {/* <div>
                        res
                    </div> */}
                </div>
            </div>
        );
    };

    const TVBox = () => {
        return (
            <div className='tv-box'>
                <h1>
                    {tv.title}
                </h1>
                <div className='content'>
                    {tv.content.split('--').map((part: any, index: number) => (
                        <div key={index}>{part}</div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="lhs-concept">
            <div className="lhs-twins">
                <SearchBox />
                <TVBox />
            </div>
        </div>
    );
}