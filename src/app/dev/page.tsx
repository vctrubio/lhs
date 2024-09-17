'use client'
import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faSort, faSearch } from '@fortawesome/free-solid-svg-icons';

import {
    ColorPalette
} from './colors';


interface ItermProps {
    title: string;
    content: string;
}

const Iterm = () => {
    const intermProps: ItermProps = {
        title: 'LHS',
        content: 'Concept of living -- Looking for the best deals Madrid'
    }

    return (
        <div className="iterm">
            <div className="container-twoes">
                <div className="tv">
                    <div>
                        <div className="sandog">
                            <FontAwesomeIcon icon={faSearch} />
                        </div>
                        <div className="caplog">
                            search
                        </div>
                    </div>
                    <div id="search-result">
                        rest of text<br></br>

                    </div>
                </div>
                <div className="tv-controller">
                    <div className="title">{intermProps.title}</div>
                    <div className="content">
                        <div className="content-one">{intermProps.content.split('--')[0]}</div>
                        <div className="content-two">{intermProps.content.split('--')[1]}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const SixWayStreet = () => {
    return (
        <div className="six-ways">
            <div>Events</div>
            <div>Properties</div>
            <div>Lifestyle</div>
            <div>
                Filter
                {/* <FontAwesomeIcon icon={faFilter}/> */}
            </div>
            <div><input id="search-ds" placeholder="Search bar"></input></div>
            <div>
                OrderBY
                {/* <FontAwesomeIcon icon={faSort}/> */}
            </div>
        </div>
    )
}

const LHS = () => {
    return (
        <div className='text-9xl bg-black p-10 text-center h-auto flex items-center justify-center flex-col gap-8' style={{letterSpacing: '12px', backgroundColor: 'var(--color-beight-light-bg)'}}>
            <div className="" style={{ color: 'var(--color-green-light)' }}>
                LHS
            </div>
            <div className="" style={{ color: 'var(--color-blue)' }}>
                LHS
            </div>
            <div className="" style={{ color: 'var(--color-backup)' }}>
                LHS
            </div>
            <div className="" style={{ color: 'white' }}>
                LHS
            </div>
        </div>
    )
}

const Testing = () => {
    return (<div className="flex flex-col gap-20 px-20">

        <ColorPalette />
        <LHS />

        <Iterm />
        <SixWayStreet />

    </div>);
}

export default Testing;