'use client'; // Ensure it's a client-side component

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { House } from '@/types/house';
import { fetchHouseByID } from '@/lib/bridges';
import Head from 'next/head';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css'; // Import the lightbox styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSnowflake, faFire, faConciergeBell, faBox, faElevator, faTshirt, faCar, faSun } from '@fortawesome/free-solid-svg-icons';
import { Amentities } from '@/types/house';

/* MetaData for SEO */
const MetaData = ({ house }) => (
    <Head>
        <title>{house.title} - Property Details</title>
        <meta name="description" content={house.description} />
        <meta property="og:title" content={house.title} />
        <meta property="og:description" content={house.description} />
        <meta property="og:image" content={`https:${house.photos[0].fields.file.url}`} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={house.title} />
        <meta name="twitter:description" content={house.description} />
        <meta name="twitter:image" content={`https:${house.photos[0].fields.file.url}`} />
    </Head>
);


const AmentitiesIcons = ({ amentities }: { amentities: Amentities }) => {
    const iconMap = {
        ac: { icon: faSnowflake, label: 'AC' },
        heating: { icon: faFire, label: 'Calefacion' },
        portero: { icon: faConciergeBell, label: 'Portero' },
        trastero: { icon: faBox, label: 'Trastero' },
        elevator: { icon: faElevator, label: 'Ascensor' },
        laundry: { icon: faTshirt, label: 'Lavenderia' },
        parking: { icon: faCar, label: 'Parking' },
        rooftop: { icon: faSun, label: 'Atico' },
    };

    return (
        <div className="flex justify-center items-center gap-4">
            {Object.entries(amentities).map(([key, value]) => {
                if (value) {
                    const { icon, label } = iconMap[key as keyof Amentities];
                    return (
                        <div key={key} className="flex flex-col items-center">
                            <FontAwesomeIcon icon={icon} title={label} />
                            <span>{label}</span>
                        </div>
                    );
                }
                return null;
            })}
        </div>
    );
};

const CardIdPage = ({ params }) => {
    const [house, setHouse] = useState<House | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);

    const { slug } = params;

    useEffect(() => {
        const fetchHouse = async () => {
            const fetchedHouse = await fetchHouseByID(slug);
            setHouse(fetchedHouse);
        };
        fetchHouse();
    }, [slug]);

    if (!house) {
        return <div>Loading...</div>;
    }

    const images = house.photos.map(photo => ({
        src: photo.fields.file.url.startsWith('http') ? photo.fields.file.url : `https:${photo.fields.file.url}`
    }));

    return (
        <>
            <MetaData house={house} /> {/* Meta tags for SEO */}
            <div className="max-w-8xl mx-auto mt-2">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">

                    {/* Photo Collage */}
                    <div className="photo-collage">
                        {house.photos.map((photo, idx) => (
                            <div
                                key={idx}
                                className={`photo-wrapper photo-${idx}`}
                                onClick={() => {
                                    setPhotoIndex(idx);
                                    setIsOpen(true);
                                }} // Open lightbox on click
                            >
                                <Image
                                    src={photo.fields.file.url.startsWith('http') ? photo.fields.file.url : `https:${photo.fields.file.url}`}
                                    alt={house.title}
                                    layout="fill"
                                    objectFit="cover"
                                    loading="lazy"
                                    quality={100}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Lightbox */}
                    {isOpen && (
                        <Lightbox
                            open={isOpen}
                            close={() => setIsOpen(false)}
                            slides={images}
                            index={photoIndex} // Start from the clicked image
                        />
                    )}

                    {/* Property Info */}
                    <div className="p-6">
                        <h1 className="text-3xl font-bold text-gray-800">{house.title}</h1>
                        <p className="text-gray-600 mt-4">{house.description}</p>

                        {/* Property Price and Area */}
                        <div className="mt-4">
                            <span className="text-2xl font-semibold text-indigo-600">
                                ${house.precio.toLocaleString()}
                            </span>
                            <span className="ml-2 text-sm text-gray-600">
                                ({house.totalArea} sqm)
                            </span>
                        </div>

                        {/* Room Details */}
                        <div className="mt-6 grid grid-cols-2 gap-4">
                            {house.rooms && Object.entries(house.rooms).map(([roomName, count]) => (
                                <div key={roomName} className="flex items-center">
                                    <span className="text-lg font-semibold text-gray-700">
                                        {roomName}:
                                    </span>
                                    <span className="ml-2 text-gray-600">{count}</span>
                                </div>
                            ))}
                        </div>

                        {/* Amentities */}
                        {
                            house.amentetiesRef &&
                            <AmentitiesIcons amentities={house.amentetiesRef} />
                        }
                        {
                            house.reformado ? 'Esta reformado' : 'Para reformar'
                        }
                        {/* Barrio Information */}
                        {
                            house.barrioRef &&
                            <div className="mt-6">
                                <h2 className="text-xl font-semibold text-gray-800">
                                    {house.barrioRef.name}
                                </h2>
                                <p className="text-gray-600">{house.barrioRef.description}</p>
                            </div>
                        }

                    </div>
                </div>
            </div>
        </>
    );
};

export default CardIdPage;
