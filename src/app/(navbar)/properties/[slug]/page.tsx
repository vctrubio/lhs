import React from 'react';
import Image from 'next/image'; // Import Next.js Image component
import { fetchHouseByID } from '@/lib/bridges';
import { House } from '@/types/house';
import Head from 'next/head';

/* MetaData for SEO */
export const MetaData = ({ house }) => (
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

const CardIdPage = async ({ params }) => {
    const { slug } = params; // Assuming slug is passed as part of the dynamic route
    const house: House | null = await fetchHouseByID(slug);

    if (!house) {
        return <div>House not found</div>;
    }

    return (
        <>
            <MetaData house={house} />  {/* not showing in head */}
            <div className="max-w-8xl mx-auto mt-2">
                <MetaData house={house} />
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">

                    {/* Album-style images at the top */}
                    <div className="photo-collage">
                        {house.photos.map((photo, idx) => (
                            <div key={idx} className={`photo-wrapper photo-${idx}`}>
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
                            {Object.entries(house.rooms).map(([roomName, count]) => (
                                <div key={roomName} className="flex items-center">
                                    <span className="text-lg font-semibold text-gray-700">
                                        {roomName}:
                                    </span>
                                    <span className="ml-2 text-gray-600">{count}</span>
                                </div>
                            ))}
                        </div>

                        {/* Barrio Information */}
                        <div className="mt-6">
                            <h2 className="text-xl font-semibold text-gray-800">
                                {house.barrioRef.name}
                            </h2>
                            <p className="text-gray-600">{house.barrioRef.description}</p>
                            <p className="text-gray-600">Rating: {house.barrioRef.rating} / 5</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CardIdPage;
