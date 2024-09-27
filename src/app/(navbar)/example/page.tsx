'use client';

import React, { useEffect, useState } from "react";
import { Property } from "@/types/property";
import { fetchPropertyByID } from "@/lib/bridges";
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

const ExampleId = () => {
    const [property, setProperty] = useState<Property | null>(null);
    const [openLightbox, setOpenLightbox] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    useEffect(() => {
        const fetchProperty = async () => {
            const fetchedProperty = await fetchPropertyByID('antonio-maura');
            setProperty(fetchedProperty);
        };
        fetchProperty();
    }, []);

    const handleLightboxOpen = (index: number) => {
        setLightboxIndex(index);
        setOpenLightbox(true);
    };

    const renderPhotoScroll = () => {
        if (!property?.photos_url || property.photos_url.length === 0) return null;
    
        const photos = property.photos_url;
    
        return (
            <div className="hero-image-scroll-container flex gap-4 overflow-x-auto h-full py-2 px-4">
                {photos.map((url, index) => (
                    <div
                        key={index}
                        className={`cursor-pointer flex-shrink-0 rounded-lg overflow-hidden transition-transform transform hover:scale-105 ${index === 0 ? 'flex-grow w-[600px] h-[500px]' : 'w-[400px] h-[300px]'}`}
                        style={{ flexBasis: index === 0 ? '60%' : '40%' }}
                        onClick={() => handleLightboxOpen(index)}
                    >
                        <img
                            src={url}
                            alt={`Property Image ${index + 1}`}
                            className="w-full h-full object-cover rounded-lg shadow-lg"
                        />
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="property-page">
            {/* Horizontal Scroll Photo Layout with Two Rows */}
            <div className="hero-image h-[900px] overflow-y-auto">
                {renderPhotoScroll()}
            </div>

            {/* Lightbox for Photos */}
            {property?.photos_url && (
                <Lightbox
                    open={openLightbox}
                    close={() => setOpenLightbox(false)}
                    index={lightboxIndex}
                    slides={property.photos_url.map((url) => ({ src: url }))}
                />
            )}

            {/* Title and Description */}
            <div className="property-details mt-6">
                <h1 className="text-3xl font-bold">{property?.title}</h1>
                <p className="mt-2 text-gray-700">{property?.description}</p>
            </div>
        </div>
    );
};

export default ExampleId;
