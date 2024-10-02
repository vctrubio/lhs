'use client';

import React from 'react';
import { usePropertyContext } from '@/lib/context';
import Image from 'next/image';
import Link from 'next/link';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Banner = () => {
    const { listings, loading, error } = usePropertyContext();

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    const bannerListing = listings[0]; // Assuming listings is an array of arrays

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true, // Adjust height based on the current slide
        centerMode: true, // Enable center mode for better centering
        centerPadding: '60px', // Space on each side of the centered item
    };

    return (
        <div style={{ width: '100%', height: '600px', border: '1px solid black' }}>
            {bannerListing && (
                <Slider {...settings}>
                    {bannerListing.map((listing, index) => (
                        <div key={index} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                            <Link href={`/propiedades/${listing.url}`} passHref>
                                <div style={{ width: '800px', height: '600px', position: 'relative', margin: '0 auto' }}>
                                    <Image
                                        src={listing.photo}
                                        alt={listing.url}
                                        layout="fill" // Fill the parent container
                                        objectFit="cover" // Ensure the image covers the area without distortion
                                        style={{ borderRadius: '8px' }} // Optional: Add border radius for aesthetics
                                    />
                                </div>
                            </Link>
                        </div>
                    ))}
                </Slider>
            )}
        </div>
    );
};

export default Banner;
