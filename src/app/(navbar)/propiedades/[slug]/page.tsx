'use client'; // Ensure it's a client-side component

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { House } from '@/types/house';
import { fetchPropertyByID } from '@/lib/bridges';
import Head from 'next/head';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css'; // Import the lightbox styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSnowflake, faFire, faConciergeBell, faBox, faElevator, faCouch, faCar, faSun, faDraftingCompass, faRulerCombined } from '@fortawesome/free-solid-svg-icons';
import { Amentities } from '@/types/house';
import { Property } from '@/types/property';
import { faBuilding } from '@fortawesome/free-regular-svg-icons';

/* MetaData for SEO */
const MetaData = ({ house }) => (
    <Head>
        <title>{house.title} - Property Details</title>
        <meta name="description" content={house.description} />
        <meta property="og:title" content={house.title} />
        <meta property="og:description" content={house.description} />
        <meta property="og:image" content={`https:${house.cover_url[0]}`} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={house.title} />
        <meta name="twitter:description" content={house.description} />
        <meta name="twitter:image" content={`https:${house.cover_url[0]}`} />
    </Head>
);

const AmentitiesIcons = ({ amentities }: { amentities: Amentities }) => {
    const iconMap = {
        ac: { icon: faSnowflake, label: 'AC' },
        heating: { icon: faFire, label: 'Calefacion' },
        portero: { icon: faConciergeBell, label: 'Portero' },
        furnished: { icon: faCouch, label: 'Furnished' },
        trastero: { icon: faBox, label: 'Trastero' },
        elevator: { icon: faElevator, label: 'Ascensor' },
        parking: { icon: faCar, label: 'Parking' },
        rooftop: { icon: faSun, label: 'Atico' },
    };
    const parsedAmentities = Object.entries(amentities).filter(([key, value]) => value && key in iconMap);

    return (
        <div className="flex justify-center items-center gap-4">
            {parsedAmentities.map(([key]) => {
                const { icon, label } = iconMap[key as keyof typeof iconMap];
                return (
                    <div key={key} className="flex flex-col items-center">
                        <FontAwesomeIcon icon={icon} title={label} />
                        <span>{label}</span>
                    </div>
                );
            })}
        </div>
    );
};

const CardIdPage = ({ params }) => {
    const [house, setHouse] = useState<Property | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);
    const [isPlanoOpen, setIsPlanoOpen] = useState(false);

    const { slug } = params;

    useEffect(() => {
        const fetchHouse = async () => {
            const fetchedHouse = await fetchPropertyByID(slug);
            setHouse(fetchedHouse);
        };
        fetchHouse();
    }, [slug]);

    if (!house) {
        return <div>Not found... Loading...</div>;
    }

    console.log("🚀 ~ CardIdPage ~ house:", house)
    const images = house.cover_url.map(photo => ({
        src: photo
    }));

    return (
        <>
            <MetaData house={house} /> {/* Meta tags for SEO */}
            <div className="page-id">
                <div className={`photo-collage ${house.photos_url.length < 5 ? 'few-photos' : ''}`}>
                    {house.photos_url.map((photo, idx) => (
                        <div
                            key={idx}
                            className={`photo-wrapper photo-${idx}`}
                            onClick={() => {
                                setPhotoIndex(idx);
                                setIsOpen(true);
                            }} // Open lightbox on click
                        >
                            <Image
                                src={photo}
                                alt={house.title}
                                layout="fill"
                                objectFit="cover"
                                loading="lazy"
                                quality={100}
                            />
                        </div>
                    ))}
                </div>

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
                    <div className='flex justify-between'>
                        <h1 className="text-3xl font-bold text-gray-800">{house.title}</h1>
                        <div className='flex items-center gap-2'>
                            <div onClick={() => setIsPlanoOpen(true)} className="cursor-pointer flex items-center">
                                <FontAwesomeIcon icon={faBuilding} />
                            </div>
                            {house.plano_url && (
                                <Lightbox
                                    open={isPlanoOpen}
                                    close={() => setIsPlanoOpen(false)}
                                    slides={[{ src: house.plano_url }]}

                                />
                            )}
                            <div className='flex gap-2 items-center'>
                                {house.charRef.metrosCuadradros} M2
                            </div>
                        </div>
                    </div>
                    <div className='property-description'>
                        {house.description}
                    </div>

                    {/* Property Price and Area */}
                    <div className='pro-flex'>
                        <div className="property-prices">
                            <div>
                                <span>{house.charRef.metrosCuadradros} m<sup>2</sup></span>
                            </div>
                            <div>
                                {
                                    house.precioIbi !== 0 ? (
                                        <div>
                                            IBI: ${house.precioIbi.toLocaleString()}
                                        </div>

                                    ) : <div>Precio ibis...</div>
                                }
                            </div>
                            <div>
                                {
                                    house.precioComunidad !== 0 ? (
                                        <div>
                                            Comunidad: ${house.precioComunidad.toLocaleString()}
                                        </div>
                                    ) : <div>Precio comunidad...</div>
                                }
                            </div>
                            <span>
                                {
                                    house.reformado ? 'Reformado' : 'Para reformar'
                                }
                            </span>
                        </div>
                        <div className="property-characteristics">
                            {house.charRef && (
                                <>
                                    {house.charRef.tipoDePropiedad && (
                                        <div className="flex items-center">
                                            <span className="text-lg font-semibold text-gray-700">Tipo de Propiedad:</span>
                                            <span className="ml-2 text-gray-600">{house.charRef.tipoDePropiedad}</span>
                                        </div>
                                    )}
                                    {house.charRef.dormitorios && (
                                        <div className="flex items-center">
                                            <span className="text-lg font-semibold text-gray-700">Dormitorios:</span>
                                            <span className="ml-2 text-gray-600">{house.charRef.dormitorios}</span>
                                        </div>
                                    )}
                                    {house.charRef.banos && (
                                        <div className="flex items-center">
                                            <span className="text-lg font-semibold text-gray-700">Baños:</span>
                                            <span className="ml-2 text-gray-600">{house.charRef.banos}</span>
                                        </div>
                                    )}
                                    {house.charRef.balcones && (
                                        <div className="flex items-center">
                                            <span className="text-lg font-semibold text-gray-700">Balcones:</span>
                                            <span className="ml-2 text-gray-600">{house.charRef.balcones}</span>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>

                        <div>
                            {
                                house.amentitiesRef &&
                                <AmentitiesIcons amentities={house.amentitiesRef} />
                            }
                        </div>

                    </div>

                    {
                        house.barrioRef &&
                        <div className="flex justify-end p-4">
                            <h2 className="text-xl font-semibold text-gray-800">
                                {house.barrioRef.name}
                            </h2>
                            <p className="text-gray-600">{house.barrioRef.description}</p>
                        </div>
                    }

                </div>
            </div>
        </>
    );
};

export default CardIdPage;