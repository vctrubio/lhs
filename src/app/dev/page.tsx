'use client'
import React, { useState, useRef, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faSort, faSearch } from '@fortawesome/free-solid-svg-icons';

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
                            <input type="text" placeholder="" />
                        </div>
                    </div>
                    <div id="search-result">
                        rest of text
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


const Testing = () => {
    return (<div className="flex flex-col gap-20 px-20">
        <div></div>get sexy with me
        <Iterm />
        <SixWayStreet />

    </div>);
}

export default Testing;