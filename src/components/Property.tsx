import { House } from "@/types/house"
import Image from "next/image";
import Link from "next/link";

function formatCurrency(value: number, rent: boolean = false): any {
    let formattedValue;
    if (value >= 1_000_000) {
        formattedValue = (value / 1_000_000).toFixed(1) + 'M';
    } else if (value >= 1_000) {
        formattedValue = (value / 1_000).toFixed(0) + 'K';
    } else {
        formattedValue = value.toLocaleString('de-DE');
    }

    return (
        <>
            {formattedValue} <span className="italic">€{rent ? '' : '/mes'}</span>
        </>
    );
}

interface DescBoxProps {
    text: string;
    svg: string;
}
const DescBox: React.FC<DescBoxProps> = ({ text, svg }) => {
    return (
        <div>
            <span>{text}</span> -
            <span>{svg}</span>
        </div>
    );
};

export const PropertyCard = ({ house }: { house: House }) => {

    const coverPhoto = house.photos[0].fields.file.url.startsWith('http')
        ? house.photos[0].fields.file.url
        : `https:${house.photos[0].fields.file.url}`;
    console.log("🚀 ~ PropertyCard ~ coverPhoto:", coverPhoto)


    return (
        <div className="property">
            <Link href={`/properties/${house.url}`}>
                <div className="property-title">
                    <h1>{house.title}</h1>
                    <h2>{formatCurrency(house.precio, house.buyOrRent)}</h2>
                </div>
                <div className="property-banner">
                    <Image
                        src={coverPhoto}
                        alt={house.title}
                        layout="fill"
                        objectFit="cover"
                        quality={100}
                        // loading="lazy"
                        priority // Added priority property
                    />
                    <div className="property-desc">
                        <DescBox text={String(house.totalArea)} svg='M2'></DescBox>
                        <DescBox text={String(house.rooms.Bedroom)} svg='📦'></DescBox>
                        <DescBox text={String(house.barrioRef.name)} svg='📍'></DescBox>
                    </div>
                </div>
            </Link>
        </div >
    )
}
