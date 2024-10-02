'use client'

import React, { useEffect, useState } from 'react';
import { usePropertyContext } from '@/lib/context';
import Image from 'next/image';
import Link from 'next/link';

const Banner = () => {
    const { listings, loading, error } = usePropertyContext();

    const bannerListing = listings[0];
    console.log("🚀 ~ Banner ~ bannerListing:", bannerListing);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            { bannerListing && bannerListing.map((listing, index) => (
                <div key={index}>
                    <Image
                        src={listing.photo}
                        alt={listing.url}
                        width={800}
                        height={400}
                        style={{ objectFit: 'cover' }}
                    >
                    </Image>
                    {listing.url}
                </div>
            ))
            }
        </div >
    );
};

export default Banner;